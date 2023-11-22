import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DiscountRulesDTO } from './subDto/Rules/rules.dto';
import { Type } from 'class-transformer';

export class CreateDiscountDTO {
  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsNumber()
  public value?: number;

  @IsOptional()
  @IsArray()
  public codes?: string[];

  @IsOptional()
  @IsString()
  public message?: string;

  @IsOptional()
  @IsBoolean()
  public isValid?: boolean;

  @IsOptional()
  @IsString()
  public detail?: string;

  @IsOptional()
  @IsString()
  public desc?: string;

  @IsOptional()
  @IsString()
  public creator?: string;

  @ValidateNested()
  @Type(() => DiscountRulesDTO)
  public rules: DiscountRulesDTO;
}
