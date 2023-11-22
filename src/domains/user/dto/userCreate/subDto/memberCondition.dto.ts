import {
  IsBoolean,
  IsDateString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ConditionHistoryDto } from './conditionHistory.dto';
import { Type } from 'class-transformer';

export class MemberConditionsDto {
  @IsOptional()
  @IsDateString()
  public dateAgreement?: Date;

  @IsOptional()
  @IsBoolean()
  public agree?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionHistoryDto)
  public history?: ConditionHistoryDto[];
}
