import {
  IsArray,
  IsDateString,
  IsIn,
  //IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import regions from 'src/common/enum/region.enum';
import { Schema } from 'mongoose';

export class CreateEbookMultiDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsDateString()
  @IsNotEmpty()
  public publishDate: Date;

  @IsNotEmpty()
  @IsString()
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

  @IsIn(regions)
  @IsString()
  public region: string;
}
