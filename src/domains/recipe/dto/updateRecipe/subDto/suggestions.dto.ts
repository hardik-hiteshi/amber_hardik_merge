import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
export class SuggestionsDTO {
  @IsOptional()
  @IsMongoId()
  public id: Types.ObjectId;

  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public niceName: string;
}
