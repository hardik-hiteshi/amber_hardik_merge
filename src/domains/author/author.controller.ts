import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { AuthorDocument } from './schema/author.schema';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dto/createAuthor/createAuthor.dto';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAuthorDTO } from './dto/updateAuthor/updateAuthor.dto';
@AUTH(Role.admin)
@Controller()
@ApiTags('Author')
export class AuthorController {
  public constructor(public authorServices: AuthorService) {}

  @Post('author')
  public async createAuthor(@Body() body: CreateAuthorDTO): Promise<object> {
    return await this.authorServices.createAuthor(body);
  }

  @Get('author/:_id')
  public async fetchAuthor(
    @Param('_id') _id: ObjectId,
  ): Promise<AuthorDocument> {
    return await this.authorServices.fetchAuthor(_id);
  }

  @Put('author/:_id')
  public async updateAuthor(
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateAuthorDTO,
  ): Promise<object> {
    return await this.authorServices.updateAuthor(_id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('author/:_id')
  public async deleteAuthor(@Param('_id') _id: ObjectId): Promise<void> {
    await this.authorServices.deleteAuthor(_id);
  }

  @Get('authors')
  public async fetchAllAuthors(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.authorServices.fetchAllAuthors(pageNumber, pageSize);
  }
}
