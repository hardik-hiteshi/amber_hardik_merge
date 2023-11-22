import { Recipe, recipeSchema } from './schema/subSchema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeController } from './recipe.controller';
import { RecipeRepository } from './repository/recipe.repository';
import { RecipeService } from './recipe.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: recipeSchema }]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [MongooseModule, RecipeRepository],
})
export class RecipeModule {}
