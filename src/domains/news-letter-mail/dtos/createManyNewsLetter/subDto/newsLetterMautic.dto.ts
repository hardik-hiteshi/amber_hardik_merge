import { IsDateString, IsOptional, IsString } from 'class-validator';

export class NewsLetterMauticDto {
  @IsOptional()
  @IsString()
  public mauticID: string;

  @IsOptional()
  @IsDateString()
  public subscribeDate: Date;
}
