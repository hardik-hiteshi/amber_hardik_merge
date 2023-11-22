import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CommunityDTO } from './subDto/community.dto';
import { InternationalConditonsDTO } from './subDto/internationalCondition.dto';
import { LayerDTO } from './subDto/layer/layer.dto';
import { LegalTermsInfoDTO } from './subDto/legal-terms.info.dto';
import { Type } from 'class-transformer';
export class CreateLegalTermsDTO {
  @IsOptional()
  @IsNumber()
  public version?: number;

  @IsOptional()
  @IsDateString()
  public startDate?: Date;

  @IsOptional()
  @IsDateString()
  public finishDate?: Date;

  @IsOptional()
  @IsString()
  public type?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayerDTO)
  public memberConditions?: LayerDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommunityDTO)
  public communityConditions?: CommunityDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => InternationalConditonsDTO)
  public internationalConditions?: InternationalConditonsDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayerDTO)
  public newsletterConditions?: LayerDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayerDTO)
  public ebookConditions?: LayerDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayerDTO)
  public contactConditions?: LayerDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayerDTO)
  public telesalesConditions?: LayerDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayerDTO)
  public ecommerceGuestConditions?: LayerDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommunityDTO)
  public termsOfSale?: CommunityDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayerDTO)
  public affiliateContactConditions?: LayerDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => LegalTermsInfoDTO)
  public info?: LegalTermsInfoDTO;
}
