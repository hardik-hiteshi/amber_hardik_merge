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
import { CreateAliasDto, UpdateAliasDto } from './dtos';
import { AliasDocument } from './schema/alias.schema';
import { AliasService } from './alias.service';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Alias')
export class AliasController {
  public constructor(private aliasService: AliasService) {}

  @Post('alias')
  private async createAlias(@Body() body: CreateAliasDto): Promise<object> {
    return this.aliasService.createOne(body);
  }

  @Put('alias/:nicename')
  private async updateAlias(
    @Param('nicename') niceName: string,
    @Body() body: UpdateAliasDto,
  ): Promise<object> {
    return this.aliasService.updateOne(niceName, body);
  }

  @Get('alias/:nicename')
  private async getAlias(
    @Param('nicename') niceName: string,
  ): Promise<AliasDocument> {
    return await this.aliasService.findOne(niceName);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('alias/:nicename')
  private async deleteAlias(
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.aliasService.deleteOne(niceName);
  }

  @Get('aliass')
  private async getAllAlias(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.aliasService.findAll(pageNumber, pageSize);
  }
}
