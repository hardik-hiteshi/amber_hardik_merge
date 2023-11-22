/* eslint-disable @typescript-eslint/naming-convention */
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAffiliateContactDTO } from '../createDto/createAffiliateContact.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAffiliateContactDTO extends PartialType(
  CreateAffiliateContactDTO,
) {
  @IsNotEmpty()
  @IsString()
  public topic: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public last_name: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsString()
  @IsOptional()
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
