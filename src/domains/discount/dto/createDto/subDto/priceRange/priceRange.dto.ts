import { IsNumber, IsOptional } from 'class-validator';

export class PriceRangeDTO {
  @IsOptional()
  @IsNumber()
  public min?: number;

  @IsOptional()
  @IsNumber()
  public max?: number;
}
