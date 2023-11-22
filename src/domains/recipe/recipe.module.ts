import { Recipe, recipeSchema } from './schema/subSchema';
import { AliasModule } from '../alias/alias.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NutritionalDisclaimerModule } from '../nutritional-disclaimer/nutritional-disclaimer.module';
import { RecipeController } from './recipe.controller';
import { RecipeRepository } from './repository/recipe.repository';
import { RecipeService } from './recipe.service';
import { UserLogModule } from '../user-log/user-log.module';

@Module({
  imports: [
    UserLogModule,
    MongooseModule.forFeature([{ name: Recipe.name, schema: recipeSchema }]),
    AliasModule,
    NutritionalDisclaimerModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [MongooseModule, RecipeRepository],
})
export class RecipeModule {}
