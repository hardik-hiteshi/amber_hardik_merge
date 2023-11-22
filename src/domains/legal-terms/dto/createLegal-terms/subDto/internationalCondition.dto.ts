import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
export class InternationalConditonsDTO {
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
  @IsBoolean()
  public companiesOneByOne?: boolean;

  @IsOptional()
  @IsString()
  public shortText?: string;

  @IsOptional()
  @IsString()
  public introductionTitle?: string;

  @IsOptional()
  @IsString()
  public introductionText?: string;

  @IsOptional()
  @IsString()
  public legalText?: string;

  @IsOptional()
  @IsString()
  public validationText?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public companyNames: string[];
}
