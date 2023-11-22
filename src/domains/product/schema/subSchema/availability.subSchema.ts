import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductAvailabilityDocument = HydratedDocument<ProductAvailability>;

@Schema()
export class ProductAvailability {
  @Prop()
  public from: Date;

  @Prop()
  public to: Date;
}

export const productAvailabilitySchema =
  SchemaFactory.createForClass(ProductAvailability);
