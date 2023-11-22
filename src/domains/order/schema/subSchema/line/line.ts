import { Prop, Schema } from '@nestjs/mongoose';
import modelNames from '../../../../../common/elements/modelNames';
import { Schema as mongooseSchema } from 'mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class Line {
  @Prop({ required: true, min: 1 })
  public quantity: number;

  @Prop({
    type: mongooseSchema.Types.Mixed,
    ref: modelNames.Product,
    required: true,
  })
  public productId: mongooseSchema.Types.Mixed;

  @Prop({
    type: mongooseSchema.Types.Mixed,
    required: true,
  })
  public productValue: mongooseSchema.Types.Mixed;

  @Prop({ required: true })
  public unitPrice: number;

  @Prop({ required: true })
  public unitTax: number;

  @Prop()
  public unitPriceWithDiscount: number;

  @Prop({ default: 0.0 })
  public discount: number;

  @Prop({ default: 0.0 })
  public unitDiscount: number;

  @Prop()
  public totalProductTax: number;

  @Prop()
  public total: number;

  @Prop({ default: 0 })
  public returned: number;

  @Prop()
  public _affiliate: boolean;

  @Prop()
  public _landing: boolean;
}
