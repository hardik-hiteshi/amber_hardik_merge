import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductPrivateDocument = HydratedDocument<ProductPrivate>;

@Schema()
export class ProductPrivate {
  @Prop()
  public brand: string;

  @Prop()
  public cost: number;

  @Prop()
  public internalReference: string;
}

export const productPrivateSchema =
  SchemaFactory.createForClass(ProductPrivate);
