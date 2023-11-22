import {
  AlternativeRecipe,
  alternativeRecipeSchema,
} from './schema/alternativeRecipe.schema';
import { AlternativeRecipeController } from './alternative-recipe.controller';
import { AlternativeRecipeRepository } from './repository/alternative-recipe.repository';
import { AlternativeRecipeService } from './alternative-recipe.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AlternativeRecipe.name, schema: alternativeRecipeSchema },
    ]),
  ],

  controllers: [AlternativeRecipeController],
  providers: [AlternativeRecipeService, AlternativeRecipeRepository],
})
export class AlternativeRecipeModule {}
