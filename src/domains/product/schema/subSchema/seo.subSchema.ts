import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductSeoDocument = HydratedDocument<ProductSeo>;

@Schema()
export class ProductSeo {
  @Prop()
  public title: string;

  @Prop()
  public description: string;

  @Prop({ default: true })
  public index: boolean;

  @Prop({ default: true })
  public follow: boolean;
}

export const productSeoSchema = SchemaFactory.createForClass(ProductSeo);
