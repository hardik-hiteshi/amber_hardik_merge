import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NestedRules } from './subSchema/nestedRules/rules';

export type DiscountDocument = HydratedDocument<Discount>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Discount {
  @Prop({ required: true, enum: ['percent', 'amount', 'fixedPrice'] })
  public type: string;

  @Prop({ min: 0 })
  public value: number;

  @Prop([String])
  public codes: string[];

  @Prop()
  public message: string;

  @Prop()
  public isValid: boolean;

  @Prop()
  public detail: string;

  @Prop()
  public desc: string;

  @Prop()
  public creator: string;

  @Prop(NestedRules)
  public rules: NestedRules;
}

export const discountSchema = SchemaFactory.createForClass(Discount);
