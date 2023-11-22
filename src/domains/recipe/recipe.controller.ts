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
  // Query,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
// import { GET_USER } from '../auth/decorator';
import { Request, Response } from 'express';
import { RecipeDocument } from './schema/recipe.schema';
import { RecipeService } from './recipe.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';
// import { UserDocument } from '../user/schema/user.schema';
@AUTH(Role.admin, Role.superadmin)
@Controller()
@ApiTags('Recipes')
export class RecipeController {
  public constructor(private recipeService: RecipeService) {}

  @Post('recipe')
  private async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateRecipeDto,
  ): Promise<object> {
    return await this.recipeService.createRecipe(region, body);
  }

  @Get('recipe/:niceName')
  private async fetchRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName,
  ): Promise<RecipeDocument> {
    return await this.recipeService.fetchRecipe(region, niceName);
  }

  @Put('recipe/:niceName')
  private async updateRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateRecipeDto,
  ): Promise<object> {
    return await this.recipeService.updateRecipe(region, body, niceName);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('recipe/:niceName')
  private async deleteRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.recipeService.deleteRecipe(region, niceName);
  }

  @Post('recipe/toNewTouch/:identifier')
  private async cloneToNewTouch(
    @Headers('region') region: string,
    @Param('identifier') identifier: string,
    @Body() body: RecipeDocument,
  ): Promise<Partial<RecipeDocument>> {
    return await this.recipeService.cloneToNewTouch(region, identifier, body);
  }

  @Get('recipes')
  private async fetchAllRecipes(
    @Req() request: Request,
    // @Headers('region') region: string,
    // @Query('format') format: string,
    // @Query('order') order: string,
    // @Query('video') video: boolean,
    // @Query('user') user: string,
    // @Query('category') category: string,
    // @Query('tags') tags: string,
    // @Query('profile') profile: string,
    // @Query('skip') pageNumber: number,
    // @Query('limit') pageSize: number,
    // @Query('search') search?: string,
  ): Promise<object> {
    return await this.recipeService.fetchAllRecipes(
      request,
      // region,
      // format,
      // order,
      // video,
      // user,
      // category,
      // tags,
      // profile,
      // pageNumber,
      // pageSize,
      // search,
    );
  }

  @Get('recipes/export/:type')
  private async exportRecipes(
    @Headers('region') region: string,
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.recipeService.exportFile(region, type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=Recipes.${file.type}`,
    });

    return new StreamableFile(file.data);
  }

  // @Post('/:niceName/comment/:parent')
  // private async addComment(
  //   @Headers('region') region: string,
  //   @Param('niceName') niceName: string,
  //   @Param('parent') parent: string,
  //   @Body() body: RecipeDocument,
  //   @GET_USER() user: UserDocument,
  // ): Promise<Partial<RecipeDocument>> {
  //   return await this.recipeService.addComment(
  //     region,
  //     niceName,
  //     parent,
  //     body,
  //     user,
  //   );
  // }
}
