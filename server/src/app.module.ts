import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/db-config';
import { Quote } from './data/entities/quote.entity';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Quote])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
