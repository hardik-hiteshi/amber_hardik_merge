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
import { BadgesDocument } from './schema/badges.schema';
import { BadgesService } from './badges.service';
import { CreateBadgesDTO } from './dto/createdto/createbadge.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateBadgesDTO } from './dto/updatedto/updatebadge.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Badges')
export class BadgesController {
  public constructor(public badgesServies: BadgesService) {}

  @Post('badge')
  public async createBadge(
    @Headers('region') region: string,
    @Body() body: CreateBadgesDTO,
  ): Promise<object> {
    return await this.badgesServies.createBadge(region, body);
  }

  @Get('badge/:niceName')
  public async fetchBadge(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<BadgesDocument> {
    return await this.badgesServies.fetchBadge(region, niceName);
  }

  @Put('badge/:niceName')
  public async updateBadge(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateBadgesDTO,
  ): Promise<object> {
    return await this.badgesServies.updateBadge(region, niceName, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('badge/:niceName')
  public async deleteBadge(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.badgesServies.deleteBadge(region, niceName);
  }

  @Get('badges')
  public async fetchBadges(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<BadgesDocument[]> {
    return await this.badgesServies.fetchBadges(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }

  @Get('badgesEnum')
  public async fetchBadgesEnum(
    @Headers('region') region: string,
  ): Promise<Promise<Array<string>>> {
    return await this.badgesServies.fetchBadgesEnum(region);
  }
}
