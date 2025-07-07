import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SendMessagesService {
  private readonly logger = new Logger(SendMessagesService.name);

  private readonly TELEGRAM_URL =
    'https://api.telegram.org/bot7256346176:AAEVp9BGEvCwRFn9WRaokNIhXKIRB9YUrkU/sendMessage';
  private readonly CHAT_ID = -4659578124;

  async SendTelegramMessage(message: string, id?: number) {
    try {
      const response = await axios.post(this.TELEGRAM_URL, {
        chat_id: id ?? this.CHAT_ID,
        text: message,
      });
      this.logger.log(`Mensaje enviado correctamente a Telegram: ${message}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error enviando mensaje a Telegram:', error.message);
      throw error;
    }
  }
}
