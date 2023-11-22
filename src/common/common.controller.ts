import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommonService } from './services/common.service';
import { FilesInterceptor } from '@nestjs/platform-express';

import { storage } from './config/multer/multer.config';

@Controller()
export class CommonController {
  public constructor(private commonService: CommonService) {}
  @Post('upload/:type')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage,
    }),
  )
  private uploadImg(
    @Param('type') type: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Array<object> {
    return this.commonService.fileUpload(files, type);
  }
}
