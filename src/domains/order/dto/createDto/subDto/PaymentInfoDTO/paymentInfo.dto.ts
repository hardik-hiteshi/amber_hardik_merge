import { IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class PaymentInfoDTO {
  @IsOptional()
  @IsString()
  public id: string;

  @IsString()
  @IsOptional()
  public date?: string;

  @IsOptional()
  @IsString()
  public dsResponse?: string;

  @IsOptional()
  @IsString()
  public signature?: string;

  @IsOptional()
  @IsString()
  public merchantParameters?: string;

  @IsOptional()
  public merchantParametersDecoded?: Schema.Types.Mixed;

  @IsOptional()
  public scalaPay?: Schema.Types.Mixed;
}
