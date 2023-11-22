/* eslint-disable @typescript-eslint/naming-convention */
import {
  IsIn,
  // IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { NutritionalKeysDTO } from './subDto/nutritionalkeys/nutritionalkeys.dto';
import { Schema } from 'mongoose';
import { Type } from 'class-transformer';

export class UpdateIngredientDto {
  @IsOptional()
  @IsString({ each: true })
  public alias?: string[];

  @IsOptional()
  @IsNumber()
  public ndb_number?: number;

  @IsOptional()
  @IsNumber()
  public unitWeight?: number;

  @IsOptional()
  @IsNumber()
  public density?: number;

  @IsOptional()
  @IsString()
  @IsIn(['volume', 'weight', 'unit'])
  public preferedUnit?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionalKeysDTO)
  public nutritional?: NutritionalKeysDTO;

  @IsOptional()
  // @IsMongoId({ each: true })
  public foodGroup?: Schema.Types.Mixed[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  public thresholdQuantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public fryQuantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public coatQuantity?: number;
}
