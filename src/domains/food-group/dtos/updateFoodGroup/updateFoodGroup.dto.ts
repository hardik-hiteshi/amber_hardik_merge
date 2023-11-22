import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TranslationDto } from './subDto/translate.dto';
import { Type } from 'class-transformer';

export class UpdateFoodGroupDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString({ each: true })
  public image?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationDto)
  public translations?: TranslationDto;

  @IsOptional()
  @IsBoolean()
  public mustShow?: boolean;
}
