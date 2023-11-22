// LegalTermsDto.ts
import { IsBoolean, IsDateString } from 'class-validator';

export class LegalTermsDto {
  @IsBoolean()
  public agree: boolean;

  @IsDateString()
  public dateAgreement: Date;
}
