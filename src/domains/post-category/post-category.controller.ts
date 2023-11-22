import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreatePostCategoryDTO } from './dto/createDto/post-category.create.dto';
import { ObjectId } from 'mongoose';
import { PostCategoryDocument } from './schema/post-category.schema';
import { PostCategoryService } from './post-category.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdatePostCategoryDTO } from './dto/updateDto/post-category.update.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Post', 'Post Page')
export class PostCategoryController {
  public constructor(public postCategoryServices: PostCategoryService) {}

  @Post('postCategory')
  public async createPostCategory(
    @Headers('region') region: string,
    @Body() body: CreatePostCategoryDTO,
  ): Promise<object> {
    return await this.postCategoryServices.createPostCategory(region, body);
  }

  @Get('postCategory/:_id')
  public async fetchPostCategory(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<PostCategoryDocument> {
    return await this.postCategoryServices.fetchPostCategory(region, _id);
  }

  @Put('postCategory/:_id')
  public async updatePostCategory(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
    @Body() body: UpdatePostCategoryDTO,
  ): Promise<object> {
    return await this.postCategoryServices.updatePostCategory(
      region,
      _id,
      body,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('postCategory/:_id')
  public async deletePostCategory(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.postCategoryServices.deletePostCategory(region, _id);
  }

  @Get('postCategories')
  public async fetchPostCategorys(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.postCategoryServices.fetchPostCategories(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }
}
