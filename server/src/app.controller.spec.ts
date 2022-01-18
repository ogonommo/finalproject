import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Quote } from './data/entities/quote.entity';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Quote),
          useValue: {
            async find() {
              return [
                {
                  text: 'Movie quote',
                  movie: 'Test movie',
                },
              ];
            },
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('GET: /quotes', () => {
    it('should return a collection of quotes', async () => {
      expect(await appController.getAllQuotes()).toEqual([
        { text: 'Movie quote', movie: 'Test movie' },
      ]);
    });
  });
});
