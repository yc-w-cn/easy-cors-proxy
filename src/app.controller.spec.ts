import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AuthService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getAppBrief', () => {
    it('should return app brief', () => {
      const result = appController.getAppBrief();
      expect(result).toBeDefined();
      expect(result.version).toBeDefined();
      expect(result.repository).toBeDefined();
    });
  });
});
