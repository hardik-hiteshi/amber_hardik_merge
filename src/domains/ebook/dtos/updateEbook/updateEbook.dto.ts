import {
  IsArray,
  IsDateString,
  //IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateEbookDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsDateString()
  @IsNotEmpty()
  public publishDate: Date;

  @IsString()
  @IsOptional()
  public niceName: string;

  @IsOptional()
  @IsString()
  public url?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsArray()
  // @IsMongoId({ each: true })
  public recipes?: string[];

  @IsOptional()
  @IsNumber()
  public mauticFormId?: number;

  @IsOptional()
  public image?: Schema.Types.Mixed;

  @IsOptional()
  public pdf?: Schema.Types.Mixed;
}
