import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { NutritionalDisclaimerTranslationsDTO } from './subDto/nutritionalDiscalimertranslations.dto';
import { NutritionalLegendDTO } from './subDto/nutritionalLegend.dto';
import { Type } from 'class-transformer';

export class CreateNutritionalDisclaimerDTO {
  @IsOptional()
  @IsString()
  public niceName?: string;

  @IsOptional()
  @IsString()
  public referenceAdvice?: string;

  @IsOptional()
  @IsString()
  public legalText?: string;

  @IsOptional()
  @IsString()
  public disclaimerColorCode?: string;

  @IsOptional()
  @IsString()
  public methodology?: string;

  @IsOptional()
  @IsString()
  public calculateForPax?: string;

  @IsOptional()
  @IsString()
  public calculateForRecipe?: string;

  @IsOptional()
  @IsString()
  public nutritionalLogo?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionalLegendDTO)
  public nutritionalLegend?: NutritionalLegendDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionalDisclaimerTranslationsDTO)
  public translations?: NutritionalDisclaimerTranslationsDTO;
}
