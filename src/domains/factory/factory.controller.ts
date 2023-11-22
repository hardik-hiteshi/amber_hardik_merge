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
import { CreateFactoryDTO } from './dto/createfactory.dto';
import { FactoryDocument } from './schema/factory.schema';
import { FactoryService } from './factory.service';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';
import { UpdateFactoryDTO } from './dto/updatefactory.dto';
@AUTH(Role.admin)
@Controller()
@ApiTags('Factory')
export class FactoryController {
  public constructor(private factoryServices: FactoryService) {}

  @Post('factory')
  private async createFactory(
    @Headers('region') region: string,
    @Body() body: CreateFactoryDTO,
  ): Promise<object> {
    return await this.factoryServices.createFactory(region, body);
  }

  @Get('factory/:_id')
  private async findAll(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.findFactory(region, _id);
  }

  @Put('factory/:_id')
  private async updateFactory(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateFactoryDTO,
  ): Promise<object> {
    return await this.factoryServices.updateFactory(region, _id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('factory/:_id')
  private async deleteFactory(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.factoryServices.deleteFactory(region, _id);
  }

  @Get('factory/:_id/machineType')
  private async fetchFactoryMachineType(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<Partial<FactoryDocument>> {
    return await this.factoryServices.fetchFactoryMachineType(region, _id);
  }

  @Get('factories')
  private async fetchFactories(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.factoryServices.findAll(region, pageNumber, pageSize);
  }
}
