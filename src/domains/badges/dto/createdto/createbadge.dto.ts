/* eslint-disable @typescript-eslint/naming-convention */
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import badgesNiceNames from '../../schema/subSchema/enums/BadgesNicenames.enum';

import { TranslationsDTO } from './subdto/badge.translations.dto';
import { Type } from 'class-transformer';

export class CreateBadgesDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  @IsEnum(badgesNiceNames, { message: 'Invalid niceName' })
  public niceName?: string;

  @IsOptional()
  @IsNumber()
  public index?: number;

  @IsOptional()
  @IsString()
  public image?: string;

  @IsNotEmpty()
  @IsString()
  public range: string;

  @IsNotEmpty()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public prize_txt?: string;

  @IsOptional()
  @IsString()
  public prize?: string;

  @IsOptional()
  @IsString()
  public terms?: string;

  //will work on this later.
  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationsDTO)
  public translations?: TranslationsDTO;
}
