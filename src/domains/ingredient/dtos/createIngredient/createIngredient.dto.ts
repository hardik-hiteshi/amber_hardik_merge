/* eslint-disable @typescript-eslint/naming-convention */
import {
  IsIn,
  // IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { NutritionalKeysDTO } from './subDto/nutritionalkeys/nutritionalkeys.dto';
import { Schema } from 'mongoose';
import { TranslationDto } from './subDto/translation.dto';
import { Type } from 'class-transformer';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  public niceName: string;

  @IsOptional()
  @IsString({ each: true })
  public alias?: string[];

  @IsOptional()
  @IsNumber()
  public ndb_number?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public unitWeight?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
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
  @ValidateNested()
  @Type(() => TranslationDto)
  public translations?: TranslationDto;

  @IsOptional()
  @Min(0)
  @IsNumber()
  public thresholdQuantity: number;

  @IsOptional()
  @Min(0)
  @IsNumber()
  public fryQuantity?: number;

  @IsOptional()
  @Min(0)
  @IsNumber()
  public coatQuantity?: number;
}
