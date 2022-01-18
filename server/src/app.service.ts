import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './data/entities/quote.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Quote)
    private readonly quotesRepository: Repository<Quote>,
  ) {}

  public async getAllQuotes(): Promise<Quote[]> {
    return this.quotesRepository.find({});
  }
}
