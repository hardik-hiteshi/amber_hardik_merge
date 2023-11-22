import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ConditionHistoryDto } from './conditionHistory.dto';
import { Type } from 'class-transformer';

export class LegalSchemaDto {
  @IsOptional()
  @IsDateString()
  public dateAgreement?: Date;

  @IsOptional()
  @IsBoolean()
  public agree?: boolean;

  @IsOptional()
  @IsNumber()
  public version?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionHistoryDto)
  public history?: ConditionHistoryDto[];
}
