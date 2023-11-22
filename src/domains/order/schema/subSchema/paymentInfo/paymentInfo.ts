import { Prop, Schema } from '@nestjs/mongoose';
import modelNames from '../../../../../common/elements/modelNames';
import { Schema as mongooseSchema } from 'mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PaymentInfo {
  @Prop()
  public id: string;

  @Prop()
  public date: string;

  @Prop()
  public dsResponse: string;

  @Prop()
  public signature: string;

  @Prop()
  public merchantParameters: string;

  @Prop({
    type: mongooseSchema.Types.Mixed,
    ref: modelNames.User,
  })
  public merchantParametersDecoded: mongooseSchema.Types.Mixed;

  @Prop({
    type: mongooseSchema.Types.Mixed,
  })
  public scalaPay: mongooseSchema.Types.Mixed;
}
