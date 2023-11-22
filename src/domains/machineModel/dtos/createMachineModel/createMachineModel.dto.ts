/* eslint-disable @typescript-eslint/naming-convention */
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum ClodVersion {
  v1 = 'S1',
  v2 = 'S1.1',
  v3 = 'S2',
}
export class CreateMachineModelDto {
  @IsNotEmpty()
  @IsString()
  public code: string;

  @IsNotEmpty()
  @IsString()
  public model: string;

  @IsOptional()
  @IsString()
  public country?: string;

  @IsNotEmpty()
  @IsString()
  public distributor: string;

  @IsNotEmpty()
  @IsString()
  public product_platform: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ClodVersion)
  public cloudVersion: string;
}
