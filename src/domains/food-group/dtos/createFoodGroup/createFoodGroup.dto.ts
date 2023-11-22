import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TranslationDto } from './subDto/translate.dto';
import { Type } from 'class-transformer';

export class CreateFoodGroupDto {
  @IsString()
  @IsNotEmpty()
  public niceName: string;

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
