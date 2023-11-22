import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { colors } from './enum/colors.enum';
import { HydratedDocument } from 'mongoose';
export type ProductAttributesDocument = HydratedDocument<ProductAttributes>;

@Schema()
export class ProductAttributes {
  @Prop([{ type: String, enum: colors }])
  public colors: string[];

  @Prop()
  public measures: string;
}

export const productAttributesSchema =
  SchemaFactory.createForClass(ProductAttributes);
