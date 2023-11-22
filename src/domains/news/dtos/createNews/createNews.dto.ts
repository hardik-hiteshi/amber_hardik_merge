import {
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  // IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { NewsMediaDto } from './subDto/newsMedia.dto';
// import { Schema } from 'mongoose';
import { Type } from 'class-transformer';

export class CreateNewsDto {
  @IsOptional()
  @IsDateString()
  public scheduleStart?: Date;

  @IsOptional()
  @IsDateString()
  public scheduleEnd?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public textSkill1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public textSkill2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public text1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  public text2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  public text3?: string;

  @IsOptional()
  @IsString()
  public video?: string;

  @IsOptional()
  @IsString({ each: true })
  public image?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => NewsMediaDto)
  public media?: NewsMediaDto;

  @IsNotEmpty()
  @IsIn(['none', 'url', 'video', 'recipes'])
  public type: string;

  @IsOptional()
  @IsArray()
  // @IsMongoId({ each: true })
  public recipes?: string[];
}
