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
import { CreatePostPageDTO } from './dto/createDto/post-page.create.dto';
import { ObjectId } from 'mongoose';
import { PostPageDocument } from './schema/post-page.schema';
import { PostPageService } from './post-page.service';
import type { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';
import { UpdatePostPageDTO } from './dto/updateDto/post-page.update.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Post', 'Post Page')
export class PostPageController {
  public constructor(public postPageServices: PostPageService) {}

  @Post('post')
  public async createPostPage(
    @Headers('region') region: string,
    @Body() body: CreatePostPageDTO,
  ): Promise<object> {
    return await this.postPageServices.createPostPage(region, body);
  }

  @Get('post/:_id')
  public async fetchPostPage(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<PostPageDocument> {
    return await this.postPageServices.fetchPostPage(region, _id);
  }

  @Put('post/:_id')
  public async updatePostPage(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
    @Body() body: UpdatePostPageDTO,
  ): Promise<object> {
    return await this.postPageServices.updatePostPage(region, _id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('post/:_id')
  public async deletePostPage(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.postPageServices.deletePostPage(region, _id);
  }

  @Get('posts')
  public async fetchPostPages(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.postPageServices.fetchPostPages(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }

  @Get('post/export/:type')
  private async exportPostPages(
    @Headers('region') region: string,
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.postPageServices.exportFile(type, region);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=PostPages.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}
