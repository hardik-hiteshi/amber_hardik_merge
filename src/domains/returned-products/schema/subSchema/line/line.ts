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

  @Prop()
  public name: string;
}
