import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';

export class CreateAdvertisementDTO {
  @IsOptional()
  @IsString()
  public niceName?: string;

  @IsOptional()
  @IsDateString()
  public date?: Date;

  @IsOptional()
  @IsString()
  public category?: string;

  @IsOptional()
  @IsString()
  public url?: string;

  @IsOptional()
  @IsString()
  public urlTitle?: string;

  @IsOptional()
  @IsNumber()
  public views?: number;

  @IsOptional()
  @IsNumber()
  public clicks?: number;

  @IsOptional()
  // @IsString()
  public image?: mongooseSchema.Types.Mixed;
}
