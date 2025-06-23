import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getHello(@Res() res: Response): void {
    console.log('yo fui');
    res.status(200).send(`<h1> OK DESDE EL SERVIDOR UNO </h1>`);
  }
}
