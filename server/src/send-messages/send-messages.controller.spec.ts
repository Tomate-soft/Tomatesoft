import { Test, TestingModule } from '@nestjs/testing';
import { SendMessagesController } from './send-messages.controller';

describe('SendMessagesController', () => {
  let controller: SendMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendMessagesController],
    }).compile();

    controller = module.get<SendMessagesController>(SendMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
