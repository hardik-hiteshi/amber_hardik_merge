import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductExtraDocument = HydratedDocument<ProductExtra>;

@Schema()
export class ProductExtra {
  @Prop({ type: Array, default: [] })
  public img: [];

  @Prop()
  public text: string;
}

export const productExtraSchema = SchemaFactory.createForClass(ProductExtra);
