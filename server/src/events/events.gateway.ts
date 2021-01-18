import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { EventsService } from './events.service';

export interface RoomScheduleOptions {
  tasks: number;
  messageId: number | string;
  accesstoken: number | string;
}

export interface RoomScheduleMap {
  [name: string]: RoomScheduleOptions[];
}

@WebSocketGateway()
export class EventsGateway {
  private readonly maxTasks = 5;
  private connectionMap = {};
  private roomScheduleMap: RoomScheduleMap = {};
  
  public server: Server;
  constructor(
    private chatRoomService: ChatRoomService,
    private eventsService: EventsService
  ) {}

  afterInit(server: Server) {
    this.server = server;
    this.eventsService.server = server;
  }

  push(name: string, options: RoomScheduleOptions) {
    let startLoop = false;
    if (!this.roomScheduleMap[name]) {
      this.roomScheduleMap[name] = [];
      startLoop = true;
    }
    const last = this.roomScheduleMap[name].slice(-1)[0];
    if (last) {
      if (last.tasks > this.maxTasks) {
        this.roomScheduleMap[name].push(options);
      } else {
        last.tasks ++;
        if (last.messageId > options.messageId) {
          last.messageId = options.messageId;
        }
      }
    } else {
      this.roomScheduleMap[name].push(options);
    }
    startLoop && this.loop(name);
  }

  delete(name: string) {
    delete this.roomScheduleMap[name];
  }

  async loop(name: string) {
    if (this.roomScheduleMap[name].length === 0) {
      this.delete(name);
      return;
    }

    const { messageId, accesstoken} = this.roomScheduleMap[name].shift();
    const data = await this.chatRoomService.getMessage(name, {
      lastMessageId: messageId || -1
    });

    this.server.to(accesstoken + '').emit('receive', {
      header: {
        room: name,
        accesstoken
      },
      body: {
        data,
        code: 0,
        message: ''
      }
    });

    this.loop(name);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('join')
  async join(client: any, payload: any) {
    const { header: { room, accesstoken } } = payload;
    const roomName = accesstoken;
    if (!this.connectionMap[client.id]) {
      this.connectionMap[client.id] = roomName;
      client.on('disconnect', () => {

        delete this.connectionMap[client.id];
        client.leaveAll();
      });
    }
    client.join(roomName);

    this.push(room, {
      tasks: 1,
      messageId: -1,
      accesstoken
    });
    
    this.server.to(roomName).emit('joined', {
      header: {
        room,
        accesstoken
      },
      body: {
        data: true,
        code: 0,
        message: ''
      }
    });
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('send')
  async handleMessage(client: any, payload: any) {
    const { header: { room, accesstoken }, body: { message } } = payload;

    const msg = await this.chatRoomService.addMessage(room, {
      message
    });

    this.push(room, {
      tasks: 1,
      messageId: msg.id - 1,
      accesstoken
    });
  }
}
