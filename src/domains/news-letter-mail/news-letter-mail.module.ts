import {
  NewsLetterMail,
  newsLetterMailSchema,
} from './schema/news.letter-mail.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsLetterMailController } from './news-letter-mail.controller';
import { NewsLetterMailRepository } from './repository/news-letter-mail.repository';
import { NewsLetterMailService } from './news-letter-mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewsLetterMail.name, schema: newsLetterMailSchema },
    ]),
  ],
  controllers: [NewsLetterMailController],
  providers: [NewsLetterMailService, NewsLetterMailRepository],
})
export class NewsLetterMailModule {}
