import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateEbookDTO } from './dtos/createEbook/createEbook.dto';
import { CreateManyEbookDto } from './dtos/createManyEbook/createManyEbook.dto';
import { EbookDocument } from './schema/ebook.schema';
import { EbookService } from './ebook.service';
import { RecipeDocument } from '../recipe/schema/recipe.schema';
import { Role } from '../auth/roles/permission.roles';
import { UpdateEbookDTO } from './dtos/updateEbook/updateEbook.dto';

@AUTH(Role.admin, Role.superadmin)
@Controller()
@ApiTags('Ebooks')
export class EbookController {
  public constructor(private ebookService: EbookService) {}

  @Post('ebook')
  private async createEbook(
    @Headers('region') region: string,
    @Body() body: CreateEbookDTO,
  ): Promise<object> {
    return await this.ebookService.createOne(region, body);
  }

  @Put('ebook/addEbook')
  private async addEbook(
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
    @Body() body: UpdateEbookDTO,
  ): Promise<EbookDocument> {
    return await this.ebookService.upsertEbookRecipe(region, niceName, body);
  }

  @Put('ebook/:nicename')
  private async updateEbook(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
    @Body() body: UpdateEbookDTO,
  ): Promise<object> {
    return await this.ebookService.updateOne(region, niceName, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('ebook/:nicename')
  private async deleteEbook(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.ebookService.deleteOne(niceName, region);
  }

  @Get('ebook/:nicename')
  private async getEbook(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<EbookDocument> {
    return await this.ebookService.findOne(niceName, region);
  }

  @Get('ebooks')
  private async getAllEbook(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.ebookService.findAll(region, pageNumber, pageSize);
  }

  @Get('ebook/recipeByEbook/:skip')
  private async getEbookRecipes(
    @Query('niceName') niceName: string,
    @Headers('region') region: string,
    @Param('skip', new ParseIntPipe()) skip: number,
  ): Promise<RecipeDocument[]> {
    return await this.ebookService.findEbookRecipes(niceName, region, skip);
  }

  @Post('ebooks')
  private async bulkInsert(
    @Headers('region') region: string,
    @Body() body: CreateManyEbookDto,
  ): Promise<EbookDocument[]> {
    return await this.ebookService.createMany(body, region);
  }
}
