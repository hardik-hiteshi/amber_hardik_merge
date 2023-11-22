import { IsOptional, IsString } from 'class-validator';

export class RankTranslationsFromDTO {
  @IsOptional()
  @IsString()
  public region?: string;

  @IsOptional()
  @IsString()
  public niceName?: string;
}
