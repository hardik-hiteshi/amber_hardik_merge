import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductWithValueDTO {
  @IsOptional()
  @IsString()
  public product?: string;

  @IsNumber()
  @IsOptional()
  public value?: number;
}
