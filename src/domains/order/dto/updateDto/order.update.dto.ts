/* eslint-disable @typescript-eslint/naming-convention */
import {
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BillingAddressDTO } from '../createDto/subDto/BillingAddressDTO/billingAddress.dto';
import { GestStocksDTO } from '../createDto/subDto/GestStocksDTO/gestStocks.dto';
import { LineDTO } from '../createDto/subDto/LineDTO/line.dto';
import { PaymentInfoDTO } from '../createDto/subDto/PaymentInfoDTO/paymentInfo.dto';
import { Schema } from 'mongoose';
import { ShippingAddressDTO } from '../createDto/subDto/ShippingAddressDTO/shippingAddress.dto';
import { TotalTaxesDTO } from '../createDto/subDto/TotalTaxesDTO/totalTaxes.dto';
import { Type } from 'class-transformer';
import { VoucherDTO } from '../createDto/subDto/VoucherDTO/voucher.dto';

export class UpdateOrderDTO {
  @IsString()
  @IsOptional()
  public typeOfMail?: string;

  @IsString()
  @IsOptional()
  public sendEmail?: string;

  @IsString()
  @IsOptional()
  public invoiceId?: string;

  @IsDateString()
  public date: Date;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => LineDTO)
  public products: LineDTO[];

  @IsOptional()
  public customer?: Schema.Types.Mixed;

  @IsOptional()
  public customerValue?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | null
    | undefined;

  @IsNotEmpty()
  @IsString()
  public payment: string;

  @ValidateNested({ each: true })
  @Type(() => PaymentInfoDTO)
  public paymentInfo: PaymentInfoDTO;

  @IsNotEmpty()
  @IsString()
  public state: string;

  @IsNumber()
  @IsNotEmpty()
  public total: number;

  @IsNumber()
  @IsNotEmpty()
  public totalWithoutShipping: number;

  @IsNumber()
  @IsNotEmpty()
  public shippingCost: number;

  @IsNumber()
  @IsNotEmpty()
  public totalDiscount: number;

  @IsNumber()
  @IsOptional()
  public discount?: number;

  @IsOptional()
  @IsString()
  public its: string;

  @IsOptional()
  @IsString()
  public lts: string;

  @IsOptional()
  @IsBoolean()
  public analytics: boolean;

  @ValidateNested({ each: true })
  @Type(() => VoucherDTO)
  public voucher: VoucherDTO;

  @ValidateNested({ each: true })
  @Type(() => TotalTaxesDTO)
  public totalTaxes: TotalTaxesDTO;

  @ValidateNested({ each: true })
  @Type(() => ShippingAddressDTO)
  public shippingAddress: ShippingAddressDTO;

  @ValidateNested({ each: true })
  @Type(() => BillingAddressDTO)
  public billingAddress: BillingAddressDTO;

  @IsOptional()
  @IsString()
  public comments?: string;

  @IsOptional()
  @IsBoolean()
  public sendAsGift?: boolean;

  @IsOptional()
  public extra?: Schema.Types.Mixed;

  @IsOptional()
  public sap_xml?: Schema.Types.Mixed;

  @ValidateNested({ each: true })
  @Type(() => GestStocksDTO)
  public gestStocks: GestStocksDTO;
}
