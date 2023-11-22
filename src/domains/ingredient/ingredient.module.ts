import { Ingredient, ingredientSchema } from './schema/ingredient.schema';
import { IngredientController } from './ingredient.controller';
import { IngredientRepository } from './repository/ingredient.repository';
import { IngredientService } from './ingredient.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: ingredientSchema },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService, IngredientRepository],
})
export class IngredientModule {}
