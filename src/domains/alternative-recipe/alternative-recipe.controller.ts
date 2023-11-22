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
import { AlternativeRecipeDocument } from './schema/alternativeRecipe.schema';
import { AlternativeRecipeService } from './alternative-recipe.service';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAlternativeRecipeDTO } from './dto/create alternative-recipe/createalternative-recipe.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAlternativeRecipeDTO } from './dto/update alternative-recipe/updatealternative-recipe.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Alternative Recipe')
export class AlternativeRecipeController {
  public constructor(
    public alternativeRecipeServices: AlternativeRecipeService,
  ) {}

  @Post('AlternativeRecipe')
  public async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateAlternativeRecipeDTO,
  ): Promise<object> {
    return await this.alternativeRecipeServices.createRecipe(region, body);
  }

  @Get('AlternativeRecipe/:niceName')
  public async fetchRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.fetchRecipe(region, niceName);
  }

  @Put('AlternativeRecipe/:niceName')
  public async updateRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateAlternativeRecipeDTO,
  ): Promise<object> {
    return await this.alternativeRecipeServices.updateRecipe(
      region,
      body,
      niceName,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('AlternativeRecipe/:niceName')
  public async deleteRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.alternativeRecipeServices.deleteRecipe(region, niceName);
  }

  @Get('alternativerecipes')
  public async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<AlternativeRecipeDocument[]> {
    return await this.alternativeRecipeServices.fetchAllRecipes(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }
}
