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
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { AUTH } from '../auth/decorator/auth.decorator';
import { Request, Response } from 'express';
import { CategoryDocument } from './schema/category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/createcategory/createcategory.dto';
// import { Role } from '../auth/roles/permission.roles';
import { UpdateCategoryDTO } from './dto/updatecategory/updatecategory.dto';

//@AUTH(Role.admin)
@Controller()
@ApiTags('Category')
export class CategoryController {
  public constructor(public categoryServices: CategoryService) {}

  @Post('category')
  public async createCategory(
    @Headers('region') region: string,
    @Body() body: CreateCategoryDTO,
  ): Promise<object> {
    return await this.categoryServices.createCategory(region, body);
  }

  @Get('category/:niceName')
  public async fetchCategory(
    @Req() request: Request,
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<CategoryDocument> {
    return await this.categoryServices.fetchCategory(request, region, niceName);
  }

  @Put('category/:niceName')
  public async updateCategory(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateCategoryDTO,
  ): Promise<object> {
    return await this.categoryServices.updateCategory(region, niceName, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('category/:niceName')
  public async deleteCategory(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.categoryServices.deleteCategory(region, niceName);
  }

  @Get('categories')
  public async fetchCategories(
    @Req() request: Request,
    //@Headers('region') region: string,
    @Query('compat') compat: string,
    @Query('visibility') visibility: boolean,
    @Query('profile') profile: string,
    @Query('type') type: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search: string,
  ): Promise<Array<object>> {
    const region = request['region'];

    return await this.categoryServices.fetchCategories(
      request,
      region,
      compat,
      visibility,
      profile,
      type,
      pageNumber,
      pageSize,
      search,
    );
  }

  @Post('categories/export-to-json')
  public async exportToJson(
    @Headers('region') region: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const expData = await this.categoryServices.exportToJson(region);
    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': 'attachment; filename=Categories.json',
    });

    return new StreamableFile(expData);
  }
}
