import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Quote } from './data/entities/quote.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('quotes')
  public async getAllQuotes(): Promise<Quote[]> {
    await new Promise((r) => setTimeout(r, 1000));

    return this.appService.getAllQuotes();
  }
}
