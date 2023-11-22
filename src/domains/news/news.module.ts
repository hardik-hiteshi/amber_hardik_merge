import { News, newsSchema } from './schema/news.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsController } from './news.controller';
import { NewsRepository } from './repository/news.repository';
import { NewsService } from './news.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: newsSchema }]),
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
})
export class NewsModule {}
