/* eslint-disable @typescript-eslint/naming-convention */
import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AffiliateConfigDocument = HydratedDocument<AffiliateConfig>;

@Schema({
  timestamps: true,
})
export class AffiliateConfig extends Document {
  @Prop({ required: true })
  public cookie_time: number;

  @Prop({ required: true, unique: true })
  public cookie_name: string;
}

export const affiliateConfigSchema =
  SchemaFactory.createForClass(AffiliateConfig);
