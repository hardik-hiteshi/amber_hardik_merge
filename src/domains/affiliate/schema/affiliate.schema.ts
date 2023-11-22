/* eslint-disable @typescript-eslint/naming-convention */
import { Document, HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BankData } from './subSchema/bankData.subSchema';
import { LegalTerms } from './subSchema/legalTerms.subSchema';

export type AffiliateDocument = HydratedDocument<Affiliate>;

@Schema({
  timestamps: true,
})
export class Affiliate extends Document {
  @Prop({ required: true, unique: true })
  public niceName: string;

  @Prop()
  public password: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public lastName: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop()
  public city: string;

  @Prop()
  public province: string;

  @Prop()
  public fiscal_address: string;

  @Prop()
  public cp: string;

  @Prop()
  public webSite: string;

  @Prop()
  public phone: string;

  @Prop()
  public message: string;

  @Prop()
  public company_name: string;

  @Prop()
  public cif: string;

  @Prop()
  public instagram: string;

  @Prop()
  public facebook: string;

  @Prop()
  public twitter: string;

  @Prop()
  public youtube: string;

  @Prop({ type: BankData })
  public bank_data: BankData;

  @Prop({ default: 'Request' })
  public state: string;

  @Prop({ default: 8 })
  public conversionTax: number;

  @Prop({ type: LegalTerms })
  public legalTerms: LegalTerms;

  @Prop({ default: '' })
  public pixel: string;

  @Prop()
  public voucherCode: string;

  @Prop({
    type: mongooseSchema.Types.Mixed,
    ref: 'Product',
  })
  public products: mongooseSchema.Types.Mixed;
}

export const affiliateSchema = SchemaFactory.createForClass(Affiliate);
