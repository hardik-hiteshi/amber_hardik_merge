/* eslint-disable @typescript-eslint/naming-convention */
// user.dto.ts
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { BankDataDto } from './subDto/bankData.dto';
import { LegalTermsDto } from './subDto/legalTerms.dto';
import { Schema as mongooseSchema } from 'mongoose';

export class CreateAffiliateDTO {
  @IsString()
  @IsNotEmpty()
  public niceName: string;

  @IsString()
  @IsOptional()
  public password?: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsOptional()
  @IsString()
  public city?: string;

  @IsOptional()
  @IsString()
  public province?: string;

  @IsOptional()
  @IsString()
  public fiscal_address?: string;

  @IsOptional()
  @IsString()
  public cp?: string;

  @IsOptional()
  @IsString()
  public webSite?: string;

  @IsOptional()
  @IsString()
  public phone?: string;

  @IsOptional()
  @IsString()
  public message?: string;

  @IsOptional()
  @IsString()
  public company_name?: string;

  @IsOptional()
  @IsString()
  public cif?: string;

  @IsOptional()
  @IsString()
  public instagram?: string;

  @IsOptional()
  @IsString()
  public facebook?: string;

  @IsOptional()
  @IsString()
  public twitter?: string;

  @IsOptional()
  @IsString()
  public youtube?: string;

  @IsObject()
  public bank_data: BankDataDto;

  @IsString()
  public state: string;

  @IsNumber()
  public conversionTax: number;

  @IsObject()
  public legalTerms: LegalTermsDto;

  // @IsString()
  // public pixel: string;

  @IsOptional()
  @IsString()
  public voucherCode?: string;

  @IsOptional()
  @IsMongoId()
  public products: mongooseSchema.Types.ObjectId;
}
