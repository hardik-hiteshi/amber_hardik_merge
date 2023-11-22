import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Schema } from 'mongoose';

export class LineDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public quantity: number;

  @IsNotEmpty()
  public productId: Schema.Types.Mixed;

  @IsNotEmpty()
  public productValue?: Schema.Types.Mixed;

  @IsNotEmpty()
  @IsNumber()
  public unitPrice?: number;

  @IsNotEmpty()
  @IsNumber()
  public unitTax?: number;

  @IsNumber()
  public unitPriceWithDiscount?: number;

  @IsNumber()
  @IsOptional()
  public discount?: number;

  @IsNumber()
  @IsOptional()
  public unitDiscount?: number;

  @IsNumber()
  @IsOptional()
  public totalProductTax?: number;

  @IsNumber()
  @IsOptional()
  public total?: number;

  @IsNumber()
  @IsOptional()
  public returned?: number;

  @IsBoolean()
  @IsOptional()
  public _affiliate?: boolean;

  @IsBoolean()
  @IsOptional()
  public _landing?: boolean;
}
