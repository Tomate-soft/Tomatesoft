import { Controller, Post } from '@nestjs/common';
import { SendMessagesService } from './send-messages.service';

@Controller('send-messages')
export class SendMessagesController {
  constructor(private sendMessageService: SendMessagesService) {}

  @Post()
  async SendMessageController(body: { message: string }) {
    {
      try {
        await this.sendMessageService.SendTelegramMessage(body.message);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
