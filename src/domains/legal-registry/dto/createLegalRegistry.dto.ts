import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateLegalRegistryDTO {
  @IsOptional()
  @IsString()
  public type?: string;

  @IsOptional()
  @IsNumber()
  public version?: number;

  @IsOptional()
  @IsString()
  public modificationSource?: string;

  @IsOptional()
  @IsDateString()
  public date?: Date;

  @IsOptional()
  @IsString()
  public agent?: string;

  @IsOptional()
  @IsString()
  public userNiceName?: string;

  @IsOptional()
  @IsString()
  public userDisplayName?: string;
}
