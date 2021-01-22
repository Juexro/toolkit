import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { EventsService } from './events.service';
@WebSocketGateway()
export class EventsGateway {
  private connectionMap = {};
  
  public server: Server;
  constructor(
    private chatRoomService: ChatRoomService,
    private eventsService: EventsService
  ) {}

  afterInit(server: Server) {
    this.server = server;
    this.eventsService.server = server;
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('join')
  async join(client: any, payload: any) {
    const { header: { room, accesstoken }, body: { lastMessageId } } = payload;
    const roomName = accesstoken;
    if (!this.connectionMap[client.id]) {
      this.connectionMap[client.id] = roomName;
      client.on('disconnect', () => {

        delete this.connectionMap[client.id];
        client.leaveAll();
      });
    }
    client.join(room);
    
    this.server.to(room).emit('joined', {
      header: {
        room,
        accesstoken
      },
      body: {
        data: `${accesstoken} 加入房间`,
        code: 0,
        message: ''
      }
    });

    const data = await this.chatRoomService.getMessage(room, {
      lastMessageId: lastMessageId || -1
    });

    this.server.to(client.id).emit('receive', {
      header: {
        room,
        type: 'history',
        accesstoken
      },
      body: {
        data,
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

    this.server.to(room).emit('receive', {
      header: {
        room,
        type: 'message',
        accesstoken
      },
      body: {
        data: {
          messages: [msg],
          count: 1
        },
        code: 0,
        message: ''
      }
    }); 
  }
}
