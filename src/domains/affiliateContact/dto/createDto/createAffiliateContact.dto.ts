/* eslint-disable @typescript-eslint/naming-convention */
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAffiliateContactDTO {
  @IsString()
  @IsNotEmpty()
  public topic: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsString()
  @IsOptional()
  public province?: string;

  @IsString()
  @IsOptional()
  public fiscal_address?: string;

  @IsString()
  @IsOptional()
  public cp?: string;

  @IsString()
  @IsOptional()
  public webSite?: string;

  @IsString()
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public message?: string;

  @IsString()
  @IsOptional()
  public company_name?: string;

  @IsString()
  @IsOptional()
  public cif?: string;

  @IsString()
  @IsOptional()
  public instagram?: string;

  @IsString()
  @IsOptional()
  public facebook?: string;

  @IsString()
  @IsOptional()
  public twitter?: string;

  @IsString()
  @IsOptional()
  public youtube?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Pending', 'Solved'])
  public status: string;

  @IsDateString()
  @IsNotEmpty()
  public date: Date;

  @IsBoolean()
  @IsOptional()
  public isCompany?: boolean;
}
