import {
  // ArrayMaxSize,
  // ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  ProductAttributesDto,
  ProductAvailabilityDto,
  ProductCmsDto,
  ProductExtraDto,
  ProductPrivateDto,
} from './subDto';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  public reference?: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductAvailabilityDto)
  public availability?: ProductAvailabilityDto;

  @IsOptional()
  @IsString()
  public gtin?: string;

  @IsOptional()
  @IsString()
  @IsIn(['private', 'public', 'test'])
  public visibility?: string;

  @IsOptional()
  @IsBoolean()
  public isBuyable?: boolean;

  @IsOptional()
  @IsBoolean()
  public isNewRelease?: boolean;

  @IsOptional()
  @IsBoolean()
  public feeds?: boolean;

  @IsOptional()
  @IsBoolean()
  public feedsForAll?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['standard'])
  public type: string;

  @IsOptional()
  @IsMongoId()
  public category?: mongoose.Schema.Types.Mixed[];

  @IsOptional()
  @IsMongoId()
  public relatedProducts?: mongoose.Schema.Types.Mixed[];

  @IsOptional()
  @MinLength(3)
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public shortDescription?: string;

  @IsOptional()
  @IsNumber()
  public taxes?: number;

  @IsOptional()
  @IsNumber()
  public stock?: number;

  @IsOptional()
  @IsArray()
  @IsString()
  public images?: string[];

  @IsOptional()
  @IsNumber()
  public originalPrice?: number;

  @IsOptional()
  @IsString()
  public originalText?: string;

  @IsOptional()
  @IsNumber()
  public price?: number;

  @IsOptional()
  @IsString()
  public priceText?: string;

  @IsOptional()
  @IsNumber()
  public landingPrice?: number;

  @IsOptional()
  @IsString()
  public landingText?: string;

  @IsOptional()
  @IsNumber()
  public affiliatePrice?: number;

  @IsOptional()
  @IsString()
  public affiliateText?: string;

  @IsOptional()
  @IsBoolean()
  public manualMode?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductPrivateDto)
  public private?: ProductPrivateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductAttributesDto)
  public attributes?: ProductAttributesDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductAttributesDto)
  public extra?: ProductExtraDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductCmsDto)
  public cms?: ProductCmsDto;

  @IsOptional()
  @IsString()
  @IsIn(['es_ES', 'en_GB'])
  public language?: string;

  @IsOptional()
  @IsString()
  public extraDescription?: string;

  @IsOptional()
  @IsString()
  public warehouse?: string;
}
