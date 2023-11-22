import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CommentReplyDTO {
  @IsOptional()
  @IsString()
  public niceName: string;

  @IsOptional()
  @IsDateString()
  public date?: Date;

  @IsOptional()
  @IsString()
  public displayName?: string;

  @IsOptional()
  @IsString()
  public rank?: string;

  @IsOptional()
  @IsString()
  public text?: string;

  @IsOptional()
  @IsBoolean()
  public hide?: boolean;

  @IsOptional()
  @IsBoolean()
  public haveImage?: boolean;
}
