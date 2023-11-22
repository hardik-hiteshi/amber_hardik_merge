import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductPrivateDto {
  @IsOptional()
  @IsString()
  public brand?: string;

  @IsOptional()
  @IsNumber()
  public cost?: number;

  @IsOptional()
  @IsString()
  public internalReference?: string;
}
