import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { LayerNestedDTO } from './layer.subdto';
import { Type } from 'class-transformer';

export class LayerDTO {
  @IsOptional()
  @IsBoolean()
  public enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  public preChecked?: boolean;

  @IsOptional()
  @IsBoolean()
  public forceValidation?: boolean;

  @IsOptional()
  @IsBoolean()
  public forceUpdate?: boolean;

  @IsOptional()
  @IsString()
  public introductionTitle?: string;

  @IsOptional()
  @IsString()
  public introductionText?: string;

  @IsOptional()
  @IsString()
  public validationText?: string;

  @IsOptional()
  @IsString()
  public validationNewsletter?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => LayerNestedDTO)
  public layer?: LayerNestedDTO[];
}
