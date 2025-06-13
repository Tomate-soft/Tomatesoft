import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

import { machineIdentifier } from './utils/chargeFiles/excel/machineIdentifier';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

  app.enableCors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'https://tomatesoft.com',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 80);
}
machineIdentifier();
bootstrap();
//
