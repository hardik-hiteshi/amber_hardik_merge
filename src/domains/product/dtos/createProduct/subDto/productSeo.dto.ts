import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ProductSeoDto {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsBoolean()
  public index?: boolean;

  @IsOptional()
  @IsBoolean()
  public follow?: boolean;
}
