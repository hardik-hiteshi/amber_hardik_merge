import { IsArray, IsOptional, IsString } from 'class-validator';

export class ProductExtraDto {
  @IsOptional()
  @IsArray()
  public img?: [];

  @IsOptional()
  @IsString()
  public text?: string;
}
