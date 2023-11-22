import { IsDateString, IsOptional, IsString } from 'class-validator';

export class InfoDTO {
  @IsOptional()
  @IsDateString()
  @IsString()
  public creationDate?: Date;

  @IsOptional()
  @IsDateString()
  @IsString()
  public modificationDate?: Date;

  @IsOptional()
  @IsString()
  public creationSource?: string;

  @IsOptional()
  @IsString()
  public modificationSource?: string;
}
