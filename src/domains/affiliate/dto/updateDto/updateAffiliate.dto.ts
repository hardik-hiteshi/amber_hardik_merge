/* eslint-disable @typescript-eslint/naming-convention */
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BankDataDto } from '../createDto/subDto/bankData.dto';
import { CreateAffiliateDTO } from '../createDto/createAffiliate.dto';
import { LegalTermsDto } from '../createDto/subDto/legalTerms.dto';
import { Schema as mongooseSchema } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class UpdateAffiliateDTO extends PartialType(CreateAffiliateDTO) {
  @IsOptional()
  @IsString()
  public password?: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public lastName: string;

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

  @ValidateNested()
  @Type(() => BankDataDto)
  public bank_data: BankDataDto;

  @IsString()
  public state: string;

  @IsNumber()
  public conversionTax: number;

  @ValidateNested()
  @Type(() => LegalTermsDto)
  public legalTerms: LegalTermsDto;

  @IsString()
  public pixel: string;

  @IsOptional()
  @IsString()
  public voucherCode?: string;

  @IsOptional()
  @IsMongoId()
  public products: mongooseSchema.Types.ObjectId;
}
