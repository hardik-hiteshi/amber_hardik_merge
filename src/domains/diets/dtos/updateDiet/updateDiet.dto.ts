import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DietTranslateDto } from './subDto/translate.dto';
import { Schema } from 'mongoose';
import { Type } from 'class-transformer';

export class UpdateDietDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  public image?: Schema.Types.Mixed;

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
}
