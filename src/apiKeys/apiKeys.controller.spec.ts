import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeysController } from './apiKeys.controller';
import { ApiKeysService } from './apiKeys.service';

describe('AppController', () => {
  let appController: ApiKeysController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiKeysController],
      providers: [ApiKeysService],
    }).compile();

    appController = app.get<ApiKeysController>(ApiKeysController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getManyApiKeys()).toBe('Hello World!');
    });
  });
});
