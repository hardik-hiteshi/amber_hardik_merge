/* eslint-disable @typescript-eslint/naming-convention */
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReportDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['Yes', 'No'])
  public manager_done: string;

  @IsNotEmpty()
  @IsString()
  public manager_comment: string;
}
