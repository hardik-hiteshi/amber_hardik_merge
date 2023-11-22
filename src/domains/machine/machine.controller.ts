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
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateMachineDto,
  CreateManyMachineDto,
  UpdateMachineDto,
} from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CsvToJsonInterceptor } from 'src/common/interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { MachineDocument } from './schema/machine.schema';
import { MachineService } from './machine.service';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Machine', 'Factory')
export class MachineController {
  public constructor(private machineService: MachineService) {}

  @Post('machine')
  private async createMachine(
    @Body() body: CreateMachineDto,
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.machineService.createOne(body, region);
  }

  @Get('machine/:_id')
  private async getMachine(
    @Param('_id') _id: ObjectId,
    @Headers('region') region: string,
  ): Promise<MachineDocument> {
    return await this.machineService.findOne(_id, region);
  }

  @Get('machines')
  private async getAllMachine(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.machineService.findAll(region, pageNumber, pageSize);
  }

  @Put('machine/:_id')
  private async updateMachine(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateMachineDto,
  ): Promise<object> {
    return this.machineService.findOneAndUpdate(region, _id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('machine/:_id')
  private async deleteMachineById(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.machineService.deleteOne(region, _id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('machine/import')
  @UseInterceptors(FileInterceptor('file'), new CsvToJsonInterceptor())
  private async createManyMachine(
    @Body() body: CreateManyMachineDto,
    @Headers('region') region: string,
  ): Promise<MachineDocument[]> {
    return await this.machineService.createMany(body, region);
  }
}
