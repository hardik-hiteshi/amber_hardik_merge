import { Document, HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AffiliateProductDocument = HydratedDocument<AffiliateProduct>;

@Schema({
  timestamps: true,
})
export class AffiliateProduct extends Document {
  @Prop({
    type: mongooseSchema.Types.Mixed,
    ref: 'Product',
  })
  public affiliateProduct: mongooseSchema.Types.Mixed;
}

export const affiliateProductSchema =
  SchemaFactory.createForClass(AffiliateProduct);
