import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IngredientsDTO } from './alternative-recipe.ingredients.subdto';
import { Type } from 'class-transformer';

export class StepsDTO {
  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsNumber()
  public cookTime?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => IngredientsDTO)
  public ingredients?: IngredientsDTO[];
}
