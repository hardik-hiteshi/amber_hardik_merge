import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NewsLetterMailChimpDto } from './newsLetterMailChimp.dto';
import { NewsLetterMauticDto } from './newsLetterMautic.dto';
import regions from 'src/common/enum/region.enum';
import { Type } from 'class-transformer';

export class NewsLetterDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  public emailAddress: string;

  @ValidateNested()
  @Type(() => NewsLetterMailChimpDto)
  public mailchimp: NewsLetterMailChimpDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => NewsLetterMauticDto)
  public mautic?: NewsLetterMauticDto;

  @IsNotEmpty()
  @IsIn(regions)
  public region: string;
}
