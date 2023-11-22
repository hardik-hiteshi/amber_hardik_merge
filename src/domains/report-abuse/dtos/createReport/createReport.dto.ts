/* eslint-disable @typescript-eslint/naming-convention */
import {
  IsDateString,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';

export class CreateReportDto {
  @IsString()
  @IsIn(['recipe', 'comment', 'rating'])
  @IsNotEmpty()
  public type: string;

  @IsOptional()
  @IsString()
  public reporting_user_niceName?: string;

  @IsOptional()
  @IsString()
  public reported_recipe_niceName?: string;

  @IsString()
  @IsOptional()
  public reported_user_niceName: string;

  @IsOptional()
  @IsString()
  public reported_text?: string;

  @IsOptional()
  @IsString()
  public report_additional_description?: string;

  @IsOptional()
  @IsDateString()
  public report_date?: Date;

  @IsOptional()
  @IsString()
  public manager_comment?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Yes', 'No'])
  public manager_done?: string;

  @IsOptional()
  @IsMongoId()
  public element_id?: Schema.Types.ObjectId;
}
