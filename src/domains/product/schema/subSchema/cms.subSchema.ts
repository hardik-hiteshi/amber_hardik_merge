import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductSeo } from './seo.subSchema';
import { ProductUrl } from './url.subSchema';

export type ProductCmsDocument = HydratedDocument<ProductCms>;

@Schema()
export class ProductCms {
  @Prop(ProductUrl)
  public url: ProductUrl;

  @Prop(ProductSeo)
  public seo: ProductSeo;
}

export const productCmsSchema = SchemaFactory.createForClass(ProductCms);
