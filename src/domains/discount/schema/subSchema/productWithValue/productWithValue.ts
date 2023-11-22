import { Prop, Schema } from '@nestjs/mongoose';
import modelNames from 'src/common/elements/modelNames';
import { Schema as mongooseSchema } from 'mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class ProductWithValue {
  @Prop({ type: [mongooseSchema.Types.Mixed], ref: modelNames.Product })
  public product: mongooseSchema.Types.Mixed[];

  @Prop()
  public value: number;
}
