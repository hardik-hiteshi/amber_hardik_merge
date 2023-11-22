import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DateRangeDTO } from '../dateRange/dateRange.dto';
import { PackWithValueDTO } from '../packWithValue/packWithValue.dto';
import { PriceRangeDTO } from '../priceRange/priceRange.dto';
import { ProductWithValueDTO } from '../productWithValue/productWithValue.dto';
import { Type } from 'class-transformer';

export class DiscountRulesDTO {
  @IsOptional()
  @IsBoolean()
  public freeShipping?: boolean;

  @IsOptional()
  @IsBoolean()
  public combinable?: boolean;

  @ValidateNested()
  @Type(() => DateRangeDTO)
  public dateRange: DateRangeDTO;

  @ValidateNested()
  @Type(() => PriceRangeDTO)
  public priceRange: PriceRangeDTO;

  @IsOptional()
  @IsNumber()
  public validUses?: number;

  @IsOptional()
  @IsString({ each: true })
  public products?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductWithValueDTO)
  public productsWithValue?: ProductWithValueDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PackWithValueDTO)
  public packsWithValue?: PackWithValueDTO[];

  @IsOptional()
  @IsString({ each: true })
  public packs?: string[];

  @IsOptional()
  @IsString({ each: true })
  public users?: string[];
}
