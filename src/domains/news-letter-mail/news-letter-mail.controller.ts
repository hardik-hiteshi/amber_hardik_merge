import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateManyNewsLetterDto, CreateNewsLetterDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { NewsLetterMailDocument } from './schema/news.letter-mail.schema';
import { NewsLetterMailService } from './news-letter-mail.service';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Newsletter', 'Mail')
export class NewsLetterMailController {
  public constructor(private newsLetterService: NewsLetterMailService) {}

  @Post('newslettermail')
  private async createNewLetter(
    @Headers('region') region: string,
    @Body() body: CreateNewsLetterDto,
  ): Promise<object> {
    return await this.newsLetterService.createOne(body, region);
  }

  @Post('newslettermails')
  private async createManyNewsLetter(
    @Headers('region') region: string,
    @Body() body: CreateManyNewsLetterDto,
  ): Promise<NewsLetterMailDocument[]> {
    return await this.newsLetterService.createMany(body, region);
  }

  @Get('newslettermail/:_id')
  private async getNewLetter(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<NewsLetterMailDocument> {
    return await this.newsLetterService.findOne(_id, region);
  }

  @Get('newslettermails')
  private async getAllNewsLetter(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.newsLetterService.findAll(region, pageNumber, pageSize);
  }
}
