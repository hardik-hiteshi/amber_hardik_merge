import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Schema } from 'mongoose';

import { CategoriesDTO, GroupsDTO, InfoDTO } from './subDto/index';
import { Type } from 'class-transformer';

export class UpdateAlternativeRecipeDTO {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public category?: string;

  @IsOptional()
  @IsString()
  public categoryNiceName?: string;

  @IsOptional()
  @IsMongoId()
  public catId?: Schema.Types.ObjectId;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CategoriesDTO)
  public categories?: CategoriesDTO[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public course?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => InfoDTO)
  public info?: InfoDTO;

  @IsOptional()
  @IsNumber()
  public totalTime?: number;

  @IsOptional()
  @IsNumber()
  public cookTime?: number;

  @IsOptional()
  @IsNumber()
  public difficulty?: number;

  @IsOptional()
  @IsNumber()
  public price?: number;

  @IsOptional()
  @IsObject()
  public size?: object;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public images?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => GroupsDTO)
  public groups?: GroupsDTO[];

  @IsOptional()
  @IsObject()
  public nutritional?: object;

  @IsOptional()
  @IsBoolean()
  public nutritionalForRation?: boolean;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  public rations?: object[];
}
