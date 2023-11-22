/* eslint-disable @typescript-eslint/naming-convention */
import {
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BillingAddressDTO } from './subDto/BillingAddressDTO/billingAddress.dto';
import { GestStocksDTO } from './subDto/GestStocksDTO/gestStocks.dto';
import { LineDTO } from './subDto/LineDTO/line.dto';
import { PaymentInfoDTO } from './subDto/PaymentInfoDTO/paymentInfo.dto';
import { Schema } from 'mongoose';
import { ShippingAddressDTO } from './subDto/ShippingAddressDTO/shippingAddress.dto';
import { TotalTaxesDTO } from './subDto/TotalTaxesDTO/totalTaxes.dto';
import { Type } from 'class-transformer';
import { VoucherDTO } from './subDto/VoucherDTO/voucher.dto';

export class CreateOrderDTO {
  @IsString()
  public id: string;

  @IsString()
  @IsOptional()
  @IsEnum(['processOrder', 'finishedOrder'], {
    message: 'Invalid type Of Mail',
  })
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
  @IsEnum(['CreditCard', 'ScalaPay'], {
    message: 'Invalid payment',
  })
  public payment: string;

  @ValidateNested({ each: true })
  @Type(() => PaymentInfoDTO)
  public paymentInfo: PaymentInfoDTO;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['WaitingPayment', 'Paid', 'Sent', 'Finished', 'Error'], {
    message: 'Invalid state',
  })
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
