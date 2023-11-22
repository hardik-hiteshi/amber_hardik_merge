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

import { CmsUserCreateDto, CmsUserUpdateDto, UpdatePasswordDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
// import { AUTH } from '../auth/decorator/auth.decorator';
import { CmsUserDocument } from './schema/cmsUser.schema';
import { CmsUserService } from './cmsUser.service';
import { GET_USER } from '../auth/decorator';
import type { Response } from 'express';
// import { Role } from '../auth/roles/permission.roles';

// @AUTH(Role.admin, Role.superadmin)
@Controller()
@ApiTags('CMS Users')
export class CmsUserController {
  public constructor(private cmsUserService: CmsUserService) {}

  @Post('cmsUser')
  private async create(
    @Body() body: CmsUserCreateDto,
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.cmsUserService.create(body, region);
  }

  @Get('cmsUser')
  private getMe(@GET_USER() user: CmsUserDocument): CmsUserDocument {
    return user;
  }

  @Get('cmsUsers')
  private async getAllUsers(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.cmsUserService.findAll(region, pageNumber, pageSize);
  }

  @Get('cmsUser/:nicename')
  private async getUser(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<CmsUserDocument> {
    return await this.cmsUserService.findOne(niceName, region);
  }

  @Get('cmsUser/export/:type')
  private async exportAllCmsUsersModel(
    @Param('type') type: string,
    @Headers('region') region: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.cmsUserService.exportFile(type, region);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=CmsUserModel.${file.type}`,
    });

    return new StreamableFile(file.data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('cmsUser/:nicename')
  private async deleteUser(
    @GET_USER() user: CmsUserDocument,
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.cmsUserService.deleteOne(user, niceName, region);
  }

  @Put('cmsUser/updatePassword/:nicename')
  private async updatePassword(
    @GET_USER() user: CmsUserDocument,
    @Body() body: UpdatePasswordDto,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.cmsUserService.updatePassword(user, body, region);
  }

  @Put('cmsUser/:nicename')
  private async updateUser(
    @GET_USER() user: CmsUserDocument,
    @Body() body: CmsUserUpdateDto,
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
  ): Promise<object> {
    return await this.cmsUserService.findOneAndUpdate(
      user,
      niceName,
      body,
      region,
    );
  }

  // @Post(':nicename/block/:blockUserNiceName')
  // private async blockUser(
  //   @Param('nicename') niceName: string,
  //   @Param('blockUserNiceName') blockUserNiceName,
  //   @Headers('region') region: string,
  // ): Promise<void> {
  //   return await this.cmsUserService.blockUser(
  //     region,
  //     niceName,
  //     blockUserNiceName,
  //   );
  // }

  // @Post(':nicename/unblock/:blockUserNiceName')
  // private async unblockUser(
  //   @Param('nicename') niceName: string,
  //   @Param('blockUserNiceName') blockUserNicename: string,
  //   @Headers('region') region: string,
  // ): Promise<void> {
  //   return await this.cmsUserService.unblockUser(
  //     region,
  //     niceName,
  //     blockUserNicename,
  //   );
  // }
  // @Post(':nicename/done/:recipeNiceName')
  // private async addDoneRecipe(
  //   @Headers('region') region: string,
  //   @Param('nicename') niceName: string,
  //   @Param('recipeNiceName') recipeNiceName: string,
  //   @GET_USER() user: CmsUserDocument,
  // ): Promise<void> {
  //   await this.cmsUserService.addDoneRecipe(
  //     region,
  //     niceName,
  //     recipeNiceName,
  //     user,
  //   );
  // }
  // @Post()
  // private async followUser(
  //   @Headers('region') region: string,
  //   @GET_USER() user: CmsUserDocument,
  //   @Param('nicename') niceName: string,
  //   @Param('followingNiceName') followingNiceName: string,
  // ): Promise<void> {
  //   await this.cmsUserService.followUser(
  //     region,
  //     user,
  //     niceName,
  //     followingNiceName,
  //   );
  // }

  // @Get(':nicename/followers')
  // private async listFollowingAndFollowers(
  //   @Headers('region') region: string,
  //   @Param('nicename') niceName: string,
  // ): Promise<IGetFollowindAndFlowers> {
  //   return await this.cmsUserService.listFollowingAndFollowers(region, niceName);
  // }

  // @Get(':nicename/blocked')
  // private async getBlockedUser(
  //   @Param('nicename') niceName: string,
  //   @Headers('region') region: string,
  // ): Promise<
  //   {
  //     niceName: string;
  //     displayName: string;
  //   }[]
  // > {
  //   return await this.cmsUserService.getBlockedUsers(niceName, region);
  // }

  // @Get(':nicename/blockedBy')
  // private async getBlockedByUser(
  //   @Param('nicename') niceName: string,
  //   @Headers('region') region: string,
  // ): Promise<
  //   {
  //     niceName: string;
  //     displayName: string;
  //   }[]
  // > {
  //   return await this.cmsUserService.getBlockedByUsers(region, niceName);
  // }

  // @Delete(':nicename/following/:followingNiceName')
  // private async unfollowUser(
  //   @Headers('region') region: string,
  //   @GET_USER() user: CmsUserDocument,
  //   @Param('nicename') niceName: string,
  //   @Param('followingNiceName') followingNiceName: string,
  // ): Promise<void> {
  //   return await this.cmsUserService.unfollowUser(
  //     region,
  //     user,
  //     niceName,
  //     followingNiceName,
  //   );
  // }
}
