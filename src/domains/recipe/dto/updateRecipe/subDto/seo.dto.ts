import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExtraDTO } from './extra.dto';
import { LinkinDTO } from './linkin.dto';
import { Schema as mongooseSchema } from 'mongoose';

// import { SuggestionsDTO } from './suggestions.dto';
import { Type } from 'class-transformer';
export class SeoDTO {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public canonical?: string;

  @IsOptional()
  @IsDateString()
  public autopublishDate?: Date;

  @IsOptional()
  @IsBoolean()
  public index?: boolean;

  @IsOptional()
  @IsBoolean()
  public follow?: boolean;

  @IsOptional()
  @IsString()
  public url?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LinkinDTO)
  public linkin?: LinkinDTO[];

  @IsOptional()
  @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => SuggestionsDTO)
  public suggestions?: mongooseSchema.Types.Mixed[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ExtraDTO)
  public extra?: ExtraDTO;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public keywords?: string[];
}
