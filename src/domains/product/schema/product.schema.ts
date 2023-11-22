import mongoose, { HydratedDocument } from 'mongoose';
import {
  ProductAttributes,
  ProductAvailability,
  ProductCms,
  ProductExtra,
  ProductPrivate,
} from './subSchema/index';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  public niceName: string;

  @Prop()
  public reference: string;

  @Prop({ required: true })
  public name: string;

  @Prop(ProductAvailability)
  public availability: ProductAvailability;

  @Prop()
  public gtin: string;

  @Prop({
    enum: ['private', 'public', 'test'],
    default: 'public',
    required: true,
  })
  public visibility: string;

  @Prop({ default: true })
  public isBuyable: boolean;

  @Prop({ default: false })
  public isNewRelease: boolean;

  @Prop({ default: false })
  public feeds: boolean;

  @Prop({ default: false })
  public feedsForAll: boolean;

  @Prop({
    enum: ['standard'],
    default: 'standard',
    required: true,
  })
  public type: string;

  @Prop([
    {
      type: mongoose.Schema.Types.Mixed,
      ref: 'ProductCategory',
      denormalize: ['niceName', 'text', 'cms'],
    },
  ])
  public category: mongoose.Schema.Types.Mixed[];

  @Prop([
    {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Product',
      validate: [
        maxRelatedProductsValidator,
        'Maximum of 3 related products allowed.',
      ],
    },
  ])
  public relatedProducts: mongoose.Schema.Types.Mixed[];

  @Prop()
  public description: string;

  @Prop({
    format: 'textarea',
    rows: 3,
    required: true,
  })
  public shortDescription: string;

  @Prop({ required: true, default: 21 })
  public taxes: number;

  @Prop()
  public stock: number;

  @Prop({ type: [String], default: [] })
  public images: string[];

  @Prop()
  public originalPrice: number;

  @Prop()
  public originalText: string;

  @Prop({ required: true })
  public price: number;

  @Prop()
  public priceText: string;

  @Prop()
  public landingPrice: number;

  @Prop()
  public landingText: string;

  @Prop()
  public affiliatePrice: number;

  @Prop()
  public affiliateText: string;

  @Prop()
  public manualMode: boolean;

  @Prop(ProductPrivate)
  public private: ProductPrivate;

  @Prop(ProductAttributes)
  public attributes: ProductAttributes;

  @Prop([ProductExtra])
  public extra: ProductExtra[];

  @Prop(ProductCms)
  public cms: ProductCms;

  @Prop({
    required: true,
    enum: ['es_ES', 'en_GB'],
    default: 'es_ES',
  })
  public language: string;

  @Prop()
  public extraDescription: string;

  @Prop()
  public warehouse: string;
}

function maxRelatedProductsValidator(value: string): boolean {
  return value.length <= 3;
}
export const productSchema = SchemaFactory.createForClass(Product);
