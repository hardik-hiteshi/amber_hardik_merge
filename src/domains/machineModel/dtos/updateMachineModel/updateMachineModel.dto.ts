/* eslint-disable @typescript-eslint/naming-convention */
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class UpdateMachineModelDto {
  @IsOptional()
  @IsString()
  public code?: string;

  @IsOptional()
  @IsString()
  public model?: string;

  @IsOptional()
  @IsString()
  public country?: string;

  @IsOptional()
  @IsString()
  public distributor?: string;

  @IsOptional()
  @IsString()
  public product_platform: string;

  @IsOptional()
  @IsString()
  @IsEnum(['S1', 'S1.1', 'S2'])
  public clodVersion?: string;
}
