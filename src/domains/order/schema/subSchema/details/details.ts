import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class Detail {
  @Prop({ required: true })
  public type: number;

  @Prop({ required: true })
  public value: number;
}
