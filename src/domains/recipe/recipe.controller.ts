import * as express from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { GET_USER } from '../auth/decorator';
import { RecipeDocument } from './schema/recipe.schema';
import { RecipeService } from './recipe.service';
import { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';
import { UserDocument } from '../user/schema/user.schema';

@AUTH(Role.admin, Role.superadmin)
@Controller()
@ApiTags('Recipes')
export class RecipeController {
  public constructor(private recipeService: RecipeService) {}

  @Post('recipe')
  private async createRecipe(
    @Headers('region') region: string,
    @Headers('user-agent') userAgent: string,
    @Body() body: CreateRecipeDto,
    @GET_USER() user: UserDocument,
    @Ip() ip: string,
  ): Promise<object> {
    return await this.recipeService.createRecipe(
      region,
      body,
      ip,
      user,
      userAgent,
    );
  }

  @Get('recipe/:niceName')
  private async fetchRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName,
    @GET_USER() user: UserDocument,
    @Query('profile') profile: string,
    @Req() req: express.Request,
  ): Promise<RecipeDocument> {
    return await this.recipeService.fetchRecipe(
      region,
      niceName,
      user,
      req,
      profile,
    );
  }

  @Put('recipe/:niceName')
  private async updateRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateRecipeDto,
    @GET_USER() user: UserDocument,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<object> {
    return await this.recipeService.updateRecipe(
      region,
      body,
      niceName,
      ip,
      user,
      userAgent,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('recipe/:niceName')
  private async deleteRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @GET_USER() user: UserDocument,
  ): Promise<void> {
    await this.recipeService.deleteRecipe(region, niceName, user);
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
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.recipeService.fetchAllRecipes(
      region,
      pageNumber,
      pageSize,
      search,
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
