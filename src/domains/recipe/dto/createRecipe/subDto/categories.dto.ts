import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CategoriesDTO {
  @IsOptional()
  @IsMongoId()
  public id: Schema.Types.ObjectId;

  @IsOptional()
  @IsString()
  public name: string;
  @IsOptional()
  @IsString()
  public niceName: string;
}
