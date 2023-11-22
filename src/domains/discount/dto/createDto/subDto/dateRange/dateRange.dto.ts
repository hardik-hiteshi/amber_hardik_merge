import { IsDateString, IsOptional } from 'class-validator';

export class DateRangeDTO {
  @IsOptional()
  @IsDateString()
  public begin: Date;

  @IsOptional()
  @IsDateString()
  public end: Date;
}
