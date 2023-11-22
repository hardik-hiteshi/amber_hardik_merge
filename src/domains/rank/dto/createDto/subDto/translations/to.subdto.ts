import { IsDateString, IsOptional, IsString } from 'class-validator';

export class RankTranslationsToDTO {
  @IsOptional()
  @IsString()
  public region?: string;

  @IsOptional()
  @IsString()
  public niceName?: string;

  @IsOptional()
  @IsDateString()
  public lastUpdate?: Date;
}
