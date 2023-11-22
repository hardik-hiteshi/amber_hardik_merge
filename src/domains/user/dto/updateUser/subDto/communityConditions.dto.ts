import {
  IsDateString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ConditionHistoryDto } from './conditionHistory.dto';
import { Type } from 'class-transformer';
export class CommunityConditionsDto {
  @IsOptional()
  @IsDateString()
  public dateAgreement?: Date;

  @IsOptional()
  @IsNumber()
  public version?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionHistoryDto)
  public history?: ConditionHistoryDto[];
}
