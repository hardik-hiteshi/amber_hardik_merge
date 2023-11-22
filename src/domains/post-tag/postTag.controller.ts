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
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreatePostTagDTO } from './dto/createDto/createPostTag.dto';
import { ObjectId } from 'mongoose';
import { PostTagDocument } from './schema/postTag.schema';
import { PostTagService } from './postTag.service';
import { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';
import { UpdatePostTagDTO } from './dto/updateDto/updatePostTag.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Post', 'Post Tag')
export class PostTagController {
  public constructor(public postTagServices: PostTagService) {}

  @Post('postTag')
  public async createpostTag(
    @Headers('region') region: string,
    @Body() body: CreatePostTagDTO,
  ): Promise<object> {
    return await this.postTagServices.createPostTag(region, body);
  }

  @Get('postTag/:_id')
  public async fetchpostTag(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<PostTagDocument> {
    return await this.postTagServices.fetchPostTag(region, _id);
  }

  @Put('postTag/:_id')
  public async updatepostTag(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
    @Body() body: UpdatePostTagDTO,
  ): Promise<object> {
    return await this.postTagServices.updatePostTag(region, _id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('postTag/:_id')
  public async deletepostTag(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.postTagServices.deletePostTag(region, _id);
  }

  @Get('postTags')
  public async fetchpostTags(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.postTagServices.fetchPostTags(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }

  @Get('postTags/export/:type')
  private async exportPostTags(
    @Headers('region') region: string,
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.postTagServices.exportFile(region, type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=PostTags.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}
