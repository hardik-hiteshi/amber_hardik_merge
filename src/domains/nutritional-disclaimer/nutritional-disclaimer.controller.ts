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
import { CreateNutritionalDisclaimerDTO } from './dto/createNutritionalDisclaimer/createNutritionalDisclaimer.dto';
import { NutritionalDisclaimerDocument } from './schema/nutritionalDisclaimer.schema';
import { NutritionalDisclaimerService } from './nutritional-disclaimer.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateNutritionalDisclaimerDTO } from './dto/updateNutritionalDisclaimer/updateNutritionalDisclaimer.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Nutritional', 'Nutritional disclaimer')
export class NutritionalDisclaimerController {
  public constructor(public ndservice: NutritionalDisclaimerService) {}

  @Post('NutritionalDisclaimer')
  public async createNutritionalDisclaimer(
    @Headers('region') region: string,
    @Body() body: CreateNutritionalDisclaimerDTO,
  ): Promise<object> {
    return await this.ndservice.createNutritionalDisclaimer(region, body);
  }

  @Get('NutritionalDisclaimer/:region')
  public async fetchNutritionalDisclaimer(
    @Param('region') region: string,
    // @Headers('region') region: string,
  ): Promise<NutritionalDisclaimerDocument> {
    return await this.ndservice.fetchNutritionalDisclaimer(region);
  }

  @Get('NutritionalDisclaimers')
  public async fetchAllNutritionalDisclaimer(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.ndservice.fetchAllNutritionalDisclaimer(
      region,
      pageNumber,
      pageSize,
    );
  }

  @Put('NutritionalDisclaimer/:region')
  public async upsertNutritionalDisclaimer(
    @Param('region') region: string,
    // @Headers('region') region: string,
    @Body() body: UpdateNutritionalDisclaimerDTO,
  ): Promise<object> {
    return await this.ndservice.upsertNutritionalDisclaimer(region, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('NutritionalDisclaimer/: region')
  public async deleteNutritionalDisclaimer(
    // @Headers('region') region: string,
    @Param('region') region: string,
  ): Promise<void> {
    await this.ndservice.deleteNutritionalDisclaimer(region);
  }
}
