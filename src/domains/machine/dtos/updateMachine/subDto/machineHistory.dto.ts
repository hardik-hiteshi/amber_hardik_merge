import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class MachineHistoryDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public guests?: string[];

  @IsOptional()
  @IsString()
  public owner?: string;

  @IsOptional()
  @IsDateString()
  public registrationDate?: Date;

  @IsOptional()
  @IsString()
  public region?: string;
}
