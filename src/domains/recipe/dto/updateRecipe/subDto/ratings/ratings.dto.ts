import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RatingReplyDTO } from './ratingreply.subdto';
import { Type } from 'class-transformer';
import { VotesDTO } from './votes.subdto';

export class RatingsDTO {
  @IsOptional()
  @IsDateString()
  public date?: Date;

  @IsOptional()
  @IsString()
  public displayName?: string;

  @IsOptional()
  @IsString()
  public niceName?: string;

  @IsOptional()
  @IsString()
  public rank?: string;

  @IsOptional()
  @IsString()
  public text?: string;

  @IsOptional()
  @IsNumber()
  public rate?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VotesDTO)
  public votes?: VotesDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RatingReplyDTO)
  public replies?: RatingReplyDTO[];

  @IsOptional()
  @IsBoolean()
  public hide?: boolean;

  @IsOptional()
  @IsBoolean()
  public haveImage?: boolean;
}
