/* eslint-disable @typescript-eslint/naming-convention */
import { Document, HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConversionDocument = HydratedDocument<Conversion>;

@Schema({
  timestamps: true,
})
export class Conversion extends Document {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Affiliate',
  })
  public affiliate: mongooseSchema.Types.ObjectId;

  @Prop()
  public name: string;

  @Prop()
  public last_name: string;

  @Prop()
  public customer_name: string;

  @Prop()
  public customer_last_name: string;

  @Prop({
    //type: mongooseSchema.Types.ObjectId,
    ref: 'Order',
  })
  public order: string;

  @Prop({ type: Date })
  public date: Date;

  @Prop()
  public total: number;

  @Prop()
  public income: number;

  @Prop({ default: 8 })
  public conversionTax: number;

  @Prop({ default: false })
  public invoiced: boolean;

  @Prop({ default: false })
  public returned: boolean;

  @Prop()
  public company_name: string;

  @Prop()
  public cif: string;
}

export const conversionSchema = SchemaFactory.createForClass(Conversion);
