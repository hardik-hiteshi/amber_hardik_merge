import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IngredientDTO } from './ingredient.dto';
import stepFunction from '.././../../../schema/subSchema/enums/stepfunction.enum';
import steptype from '.././../../../schema/subSchema/enums/steptype.enum';
import { Type } from 'class-transformer';
export class StepsDTO {
  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  @IsIn(steptype)
  public type?: string;

  @IsOptional()
  @IsNumber()
  public cookTime?: number;

  @IsOptional()
  @IsNumber()
  public temperature?: number;

  @IsOptional()
  @IsString()
  public speed?: string;

  @IsOptional()
  @IsNumber()
  public outsideTemperature?: number;

  @IsOptional()
  @IsNumber()
  public microwaveWatts?: number;

  @IsOptional()
  @IsNumber()
  public stepTime?: number;

  @IsOptional()
  @IsArray()
  @IsIn([
    'SplashCover',
    'mixingBlade',
    'noMeasureCup',
    'basket',
    'reverseBasket',
    'spatula',
    'steamer',
    'plug',
  ])
  // @IsString({ each: true })
  public accessories?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => IngredientDTO)
  @ValidateNested({ each: true })
  public ingredients?: IngredientDTO[];

  @IsOptional()
  @IsString()
  @IsIn(stepFunction)
  public function?: string;

  @IsOptional()
  @IsBoolean()
  public haveImage?: boolean;
}
