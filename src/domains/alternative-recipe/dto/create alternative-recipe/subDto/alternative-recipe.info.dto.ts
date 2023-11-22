import { IsDateString, IsOptional, IsString } from 'class-validator';
export class InfoDTO {
  @IsOptional()
  @IsDateString()
  public creationDate?: Date;

  @IsOptional()
  @IsDateString()
  public modificationDate?: Date;

  @IsOptional()
  @IsString()
  public creationSource?: string;

  @IsOptional()
  @IsString()
  public modificationSource?: string;
}
