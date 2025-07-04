import { Module } from '@nestjs/common';
import { SendMessagesController } from './send-messages.controller';
import { SendMessagesService } from './send-messages.service';

@Module({
  controllers: [SendMessagesController],
  providers: [SendMessagesService],
})
export class SendMessagesModule {}
