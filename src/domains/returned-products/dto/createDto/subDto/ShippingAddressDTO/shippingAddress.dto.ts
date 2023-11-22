import { IsOptional, IsString } from 'class-validator';

export class ShippingAddressDTO {
  @IsOptional()
  @IsString()
  public nameLastName?: string;

  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public lastName?: string;

  @IsString()
  @IsOptional()
  public idcard?: string;

  @IsString()
  @IsOptional()
  public address?: string;

  @IsString()
  @IsOptional()
  public zip?: string;

  @IsString()
  @IsOptional()
  public state?: string;

  @IsString()
  @IsOptional()
  public country?: string;

  @IsString()
  @IsOptional()
  public town?: string;

  @IsString()
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public mobile?: string;
}
