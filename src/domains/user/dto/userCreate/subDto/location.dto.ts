import { IsOptional, IsString } from 'class-validator';
export class LocationDto {
  @IsOptional()
  @IsString()
  public address?: string;

  @IsOptional()
  @IsString()
  public zip?: string;

  @IsOptional()
  @IsString()
  public town?: string;

  @IsOptional()
  @IsString()
  public state?: string;

  @IsOptional()
  @IsString()
  public country?: string;
}
