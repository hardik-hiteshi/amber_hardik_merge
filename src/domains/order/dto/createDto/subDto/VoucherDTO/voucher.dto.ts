import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class VoucherDTO {
  @IsOptional()
  @IsString()
  public code?: string;

  @IsString()
  @IsOptional()
  @IsEnum(['applied', 'invalid', 'expired'], {
    message: 'Invalid voucher status',
  })
  public status?: string;

  @IsOptional()
  @IsString()
  public message?: string;

  @IsOptional()
  @IsString()
  public type?: string;

  @IsOptional()
  @IsNumber()
  public multiplier?: number;
}
