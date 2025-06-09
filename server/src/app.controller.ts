import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as os from 'os';

@Controller()
export class AppController {
  @Get()
  getHello(@Res() res: Response): void {
    const hostname = os.hostname(); // Obtiene el nombre del contenedor
    res.status(200).send(`<h1> OK DESDE EL SERVIDOR ${hostname} </h1>`);
  }
}
