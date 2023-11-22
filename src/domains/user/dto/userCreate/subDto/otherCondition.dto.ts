import { IsDateString, IsOptional, ValidateNested } from 'class-validator';
import { ConditionHistoryDto } from './conditionHistory.dto';
import { Type } from 'class-transformer';

export class OtherConditionsDto {
  @IsOptional()
  @IsDateString()
  public dateAgreement?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionHistoryDto)
  public history?: ConditionHistoryDto[];
}
