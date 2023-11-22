import { IsNumber, IsOptional } from 'class-validator';

export class SocialDTO {
  @IsOptional()
  @IsNumber()
  public favorite?: number;

  @IsOptional()
  @IsNumber()
  public facebook?: number;

  @IsOptional()
  @IsNumber()
  public comments?: number;

  @IsOptional()
  @IsNumber()
  public ratings?: number;

  @IsOptional()
  @IsNumber()
  public todo?: number;
}
