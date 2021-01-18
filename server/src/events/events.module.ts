import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { ChatRoomModule } from 'src/chat-room/chat-room.module';

@Module({
  imports: [ChatRoomModule],
  providers: [EventsService, EventsGateway],
  exports: [EventsGateway]
})
export class EventsModule {}
