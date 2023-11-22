import { IsDateString, IsOptional } from 'class-validator';

export class ProductAvailabilityDto {
  @IsOptional()
  @IsDateString()
  public from?: Date;

  @IsOptional()
  @IsDateString()
  public to?: Date;
}
