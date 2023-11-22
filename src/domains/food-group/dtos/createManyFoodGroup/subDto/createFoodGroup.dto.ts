import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import regions from 'src/common/enum/region.enum';
import { TranslationDto } from './translate.dto';
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

  @IsString()
  @IsIn(regions)
  public region: string;
}
