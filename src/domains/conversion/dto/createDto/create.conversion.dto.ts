/* eslint-disable @typescript-eslint/naming-convention */
// user.dto.ts
import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';

export class CreateConversionDTO {
  @IsMongoId()
  @IsOptional()
  public affiliate?: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public last_name?: string;

  @IsOptional()
  @IsString()
  public customer_name?: string;

  @IsOptional()
  @IsString()
  public customer_last_name?: string;

  @IsOptional()
  @IsString()
  public order?: string;

  @IsOptional()
  @IsString()
  public date?: Date;

  @IsOptional()
  @IsNumber()
  public total?: number;

  @IsOptional()
  @IsNumber()
  public income?: number;

  @IsOptional()
  public conversionTax?: number;

  @IsBoolean()
  public invoiced: boolean;

  @IsBoolean()
  public returned: boolean;

  @IsOptional()
  @IsString()
  public company_name?: string;

  @IsOptional()
  @IsString()
  public cif?: string;
}
