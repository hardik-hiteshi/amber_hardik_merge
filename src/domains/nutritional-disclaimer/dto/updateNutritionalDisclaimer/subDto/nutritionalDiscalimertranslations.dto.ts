import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NutritionalDisclaimerFromDTO } from './from.dto';
import { NutritionalDisclaimerToDTO } from './to.dto';
import { Type } from 'class-transformer';

export class NutritionalDisclaimerTranslationsDTO {
  @IsOptional()
  @IsString()
  @ValidateNested()
  @Type(() => NutritionalDisclaimerFromDTO)
  public from?: NutritionalDisclaimerFromDTO;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => NutritionalDisclaimerToDTO)
  public to?: NutritionalDisclaimerToDTO[];

  @IsOptional()
  @IsBoolean()
  public preserve?: string;
}
