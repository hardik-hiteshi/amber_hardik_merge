import { IsOptional, IsString } from 'class-validator';
export class NutritionalDisclaimerFromDTO {
  @IsOptional()
  @IsString()
  public region?: string;

  @IsOptional()
  @IsString()
  public niceName?: string;
}
