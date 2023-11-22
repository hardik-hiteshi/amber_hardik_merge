import { IsDateString, IsOptional, IsString } from 'class-validator';
export class RatingReplyDTO {
  @IsOptional()
  @IsDateString()
  public date: Date;

  @IsOptional()
  @IsString()
  public displayName: string;

  @IsOptional()
  @IsString()
  public niceName: string;

  @IsOptional()
  @IsString()
  public rank: string;

  @IsOptional()
  @IsString()
  public text: string;
}
