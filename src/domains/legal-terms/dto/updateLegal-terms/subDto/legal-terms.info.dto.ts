import { IsDateString, IsOptional, IsString } from 'class-validator';

export class LegalTermsInfoDTO {
  @IsOptional()
  @IsDateString()
  public modificationDate?: Date;

  @IsOptional()
  @IsString()
  public modificationSource?: string;
}
