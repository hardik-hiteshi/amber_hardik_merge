import { IsDateString, IsOptional, IsString } from 'class-validator';

export class NewsLetterMailChimpDto {
  @IsString()
  @IsOptional()
  public mailchimpID?: string;

  @IsDateString()
  @IsOptional()
  public subscribeDate?: Date;
}
