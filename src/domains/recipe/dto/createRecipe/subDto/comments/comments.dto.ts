import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CommentReplyDTO } from './commentsreply.dto';
import { Schema as mongooseSchema } from 'mongoose';
import { Type } from 'class-transformer';
export class CommentsDTO {
  @IsOptional()
  @IsString()
  public niceName?: string;

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
  @ValidateNested({ each: true })
  @Type(() => CommentReplyDTO)
  public comments?: CommentReplyDTO[];

  @IsOptional()
  @IsBoolean()
  public hide?: boolean;

  @IsOptional()
  @IsArray()
  public image?: mongooseSchema.Types.Mixed[];

  @IsOptional()
  @IsString()
  public haveImage?: boolean;
}
