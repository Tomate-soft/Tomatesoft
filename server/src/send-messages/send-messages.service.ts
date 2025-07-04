import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SendMessagesService {
  constructor() {}

  async SendTelegramMessage(message: string) {
    const TELEGRAM_URL =
      'https://api.telegram.org/bot7256346176:AAEVp9BGEvCwRFn9WRaokNIhXKIRB9YUrkU/sendMessage';
    await axios.post(TELEGRAM_URL, {
      chat_id: -4659578124,
      text: message,
    });
  }
}
