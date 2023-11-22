import { CreateReportDto } from '../createReport/createReport.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateManyReportsDto {
  @ValidateNested({ each: true })
  @Type(() => CreateReportDto)
  public data: CreateReportDto[];
}
