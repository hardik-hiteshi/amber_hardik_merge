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
  @IsBoolean()
  public agree?: boolean;

  @IsOptional()
  @IsNumber()
  public version?: number;

  @IsOptional()
  @IsDateString()
  public dateAgreement?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionHistoryDto)
  public history?: ConditionHistoryDto[];
}
