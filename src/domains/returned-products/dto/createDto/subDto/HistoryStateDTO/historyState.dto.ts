import { IsDateString, IsOptional, IsString } from 'class-validator';

export class HistoryStateDTO {
  @IsOptional()
  @IsString()
  public state?: string;

  @IsDateString()
  @IsOptional()
  public date: Date;

  @IsOptional()
  @IsString()
  public comments?: string;

  @IsOptional()
  @IsString()
  public modificationUser?: string;
}
