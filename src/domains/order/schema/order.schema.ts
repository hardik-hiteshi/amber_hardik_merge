/* eslint-disable no-duplicate-imports */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BillingAddress } from './subSchema/billingAddress/billingAddress';
import { GestStocks } from './subSchema/gestStocks/gestStocks';
import { HydratedDocument } from 'mongoose';
import { Line } from './subSchema/line/line';
import modelNames from '../../../common/elements/modelNames';
import { Schema as mongooseSchema } from 'mongoose';
import { PaymentInfo } from './subSchema/paymentInfo/paymentInfo';
import { ShippingAddress } from './subSchema/shippingAddress/shippingAddress';
import { TotalTaxes } from './subSchema/totalTaxes/totalTaxes';
import { Voucher } from './subSchema/voucher/voucher';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Order {
  @Prop({ unique: true })
  public id: string;

  @Prop({ enum: ['processOrder', 'finishedOrder'] })
  public typeOfMail: string;

  @Prop()
  public sendEmail: string;

  @Prop()
  public invoiceId: string;

  @Prop({ required: true, default: Date.now })
  public date: Date;

  @Prop([Line])
  public products: Line[];

  @Prop({
    type: mongooseSchema.Types.Mixed,
    ref: modelNames.User,
    required: true,
  })
  public customer: mongooseSchema.Types.Mixed;

  @Prop({ type: mongooseSchema.Types.Mixed })
  public customerValue: mongooseSchema.Types.Mixed;

  @Prop({
    required: true,
    enum: ['CreditCard', 'ScalaPay'],
    default: 'CreditCard',
  })
  public payment: string;

  @Prop(PaymentInfo)
  public paymentInfo: PaymentInfo;

  @Prop({
    required: true,
    default: 'WaitingPayment',
    enum: ['WaitingPayment', 'Paid', 'Sent', 'Finished', 'Error'],
  })
  public state: string;

  @Prop({ required: true })
  public total: number;

  @Prop({ required: true })
  public totalWithoutShipping: number;

  @Prop({ required: true })
  public shippingCost: number;

  @Prop({ required: true })
  public totalDiscount: number;

  @Prop({ required: true, default: 0 })
  public discount: number;

  @Prop()
  public its: string;

  @Prop()
  public lts: string;

  @Prop({ default: false })
  public analytics: boolean;

  @Prop(Voucher)
  public voucher: Voucher;

  @Prop(TotalTaxes)
  public totalTaxes: TotalTaxes;

  @Prop(ShippingAddress)
  public shippingAddress: ShippingAddress;

  @Prop(BillingAddress)
  public billingAddress: BillingAddress;

  @Prop()
  public comments: string;

  @Prop({ default: false })
  public sendAsGift: boolean;

  @Prop({ type: mongooseSchema.Types.Mixed })
  public extra: mongooseSchema.Types.Mixed;

  @Prop({ type: mongooseSchema.Types.Mixed })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public sap_xml: mongooseSchema.Types.Mixed;

  @Prop(GestStocks)
  public gestStocks: GestStocks;
}

export const orderSchema = SchemaFactory.createForClass(Order);
