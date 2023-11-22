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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateUserLogDTO } from './dtos/createUserlog.dto';
import { Role } from '../auth/roles/permission.roles';
import { UserLogDocument } from './schema/user-log.schema';
import { UserLogService } from './user-log.service';

@AUTH(Role.admin)
@Controller()
@ApiTags('Logs', 'User Logs')
export class UserLogController {
  public constructor(public ulservice: UserLogService) {}

  @Post('userlog')
  public async createUserLog(
    @Headers('region') region: string,
    @Body() body: CreateUserLogDTO,
  ): Promise<object> {
    return await this.ulservice.createUserLog(region, body);
  }

  @Get('userlog/:niceName')
  public async fetchUserLog(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<UserLogDocument> {
    return await this.ulservice.fetchUserLog(region, niceName);
  }

  @Get('userlogs')
  public async fetchAllUserLog(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.ulservice.fetchAllUserLog(region, pageNumber, pageSize);
  }

  //   @Put('userlog/:niceName')
  //   public async updateUserLog(
  //     @Headers('region') region: string,
  //     @Param('niceName') niceName: string,
  //   ): Promise<object> {
  //     return await this.ulservice.updateUserLog(region, niceName);
  //   }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('userlog/:niceName')
  public async deleteUserLog(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.ulservice.deleteUserLog(region, niceName);
  }
}
