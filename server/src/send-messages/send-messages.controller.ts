import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SendMessagesService } from './send-messages.service';

@Controller('send-messages')
export class SendMessagesController {
  constructor(private sendMessageService: SendMessagesService) {}

  @Post()
  async sendMessageController(@Body() body: { message: string }) {
    try {
      await this.sendMessageService.SendTelegramMessage(body.message);
      return { success: true, message: 'Mensaje enviado a Telegram' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error enviando mensaje a Telegram',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
