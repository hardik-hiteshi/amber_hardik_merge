import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DietTranslateDto } from './subDto/translate.dto';
import regions from 'src/common/enum/region.enum';
import { Schema } from 'mongoose';
import { Type } from 'class-transformer';

export class CreateDietDto {
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
  @IsArray()
  public foodGroups?: Schema.Types.Mixed[];

  @IsOptional()
  @IsString({ each: true })
  public tags?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DietTranslateDto)
  public translations?: DietTranslateDto;

  @IsString()
  @IsNotEmpty()
  @IsIn(regions)
  public region: string;
}
