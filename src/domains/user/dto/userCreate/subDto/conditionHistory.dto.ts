import { IsDateString, IsNumber, IsOptional } from 'class-validator';
export class ConditionHistoryDto {
  @IsOptional()
  @IsDateString()
  public dateAgreement?: Date;

  @IsOptional()
  @IsNumber()
  public version?: number;
}
