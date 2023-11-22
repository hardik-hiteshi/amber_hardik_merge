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
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateMachineModelDto,
  CreateManyMachineModelDto,
  UpdateMachineModelDto,
} from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CsvToJsonInterceptor } from 'src/common/interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { MachineModelDocument } from './schema/machineModel.schema';
import { MachineModelService } from './machineModel.service';
import type { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Machine Models', 'Machine')
export class MachineModelController {
  public constructor(public machineModelService: MachineModelService) {}

  @Post('machinemodel')
  private async createMachineModel(
    @Body() body: CreateMachineModelDto,
  ): Promise<object> {
    return await this.machineModelService.createOne(body);
  }

  @Get('machinemodel/:code')
  private async getMachineModel(
    @Param('code ') code: string,
  ): Promise<MachineModelDocument> {
    return await this.machineModelService.findOne(code);
  }

  @Get('machinemodels')
  private async getAllMachineModel(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.machineModelService.findAll(pageNumber, pageSize);
  }

  @Put('machinemodel/:code')
  private async updateMachineModel(
    @Param('code') code: string,
    @Body() body: UpdateMachineModelDto,
  ): Promise<object> {
    return await this.machineModelService.findOneAndUpdate(code, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('machinemodel/:code')
  private async deleteMachineModel(@Param('code') code: string): Promise<void> {
    await this.machineModelService.deleteOne(code);
  }

  @HttpCode(HttpStatus.OK)
  @Post('machinemodel/import')
  @UseInterceptors(FileInterceptor('file'), new CsvToJsonInterceptor())
  private async createManyMachineModel(
    @Body() body: CreateManyMachineModelDto,
  ): Promise<void> {
    await this.machineModelService.createMany(body);
  }

  @Get('machinemodel/export/:type')
  private async exportManyMachineModel(
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.machineModelService.exportFile(type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=MachineModel.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}
