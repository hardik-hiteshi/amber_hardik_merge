import { IsOptional, ValidateNested } from 'class-validator';
import { ProductSeoDto } from './productSeo.dto';
import { ProductUrlDto } from './productUrl.dto';
import { Type } from 'class-transformer';

export class ProductCmsDto {
  @ValidateNested({ each: true })
  @Type(() => ProductUrlDto)
  public url: ProductUrlDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductSeoDto)
  public seo?: ProductSeoDto;
}
