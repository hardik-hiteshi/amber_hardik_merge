import { IsDateString, IsOptional, IsString } from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';

export class UpdateAdvertisementDTO {
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
  //@IsString()
  public image?: mongooseSchema.Types.Mixed;

  @IsOptional()
  @IsDateString()
  public date?: Date;
}
