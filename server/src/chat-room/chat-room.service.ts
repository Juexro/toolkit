import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';
import { AddMessageOptions, GetMessageOptions } from './interfaces/index.interface';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>
  ) { }

  async createRoom(room: CreateRoomDto) {
    const { name } = room;
    return await this.roomRepository.save({
      name
    });
  }

  async addMessage(roomId: string, options: AddMessageOptions) {
    const { message } = options;
    const room = await this.roomRepository.findOne(roomId);

    return await this.messageRepository.save({
      message,
      room
    });
  }

  async getMessage(roomId: string, options: GetMessageOptions) {
    const { lastMessageId = -1, pageSize = 10 } = options;
    const [messages, count] = await this.messageRepository.createQueryBuilder('message')
      .where('message.roomId = :roomId')
      .andWhere('id > :messageId')
      .setParameters({
        roomId,
        messageId: lastMessageId
      })
      .orderBy('message.createAt', 'DESC')
      .take(pageSize)
      .getManyAndCount();

    return {
      messages,
      count
    };
  }
}
