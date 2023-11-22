import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class CommunityDTO {
  @IsOptional()
  @IsBoolean()
  public enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  public preChecked?: boolean;

  @IsOptional()
  @IsBoolean()
  public forceValidation?: boolean;

  @IsOptional()
  @IsBoolean()
  public forceUpdate?: boolean;

  @IsOptional()
  @IsString()
  public introductionTitle?: string;

  @IsOptional()
  @IsString()
  public introductionText?: string;

  @IsOptional()
  @IsString()
  public validationText?: string;

  @IsOptional()
  @IsString()
  public legalText?: string;
}
