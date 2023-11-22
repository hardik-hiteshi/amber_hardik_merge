/* eslint-disable @typescript-eslint/naming-convention */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
// import { TranslationsDTO } from './subdto/badge.translations.dto';
// import { Type } from 'class-transformer';

export class UpdateBadgesDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsNumber()
  public index?: number;

  @IsOptional()
  @IsString()
  public image?: string;

  @IsNotEmpty()
  @IsString()
  public range?: string;

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
  //   @IsOptional()
  //   @ValidateNested()
  //   @Type(() => TranslationsDTO)
  //   public translations: TranslationsDTO;
}
