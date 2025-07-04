import { Test, TestingModule } from '@nestjs/testing';
import { SendMessagesService } from './send-messages.service';

describe('SendMessagesService', () => {
  let service: SendMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMessagesService],
    }).compile();

    service = module.get<SendMessagesService>(SendMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
