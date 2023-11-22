import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PageAutoPublish {
  @Prop({ type: Date })
  public type: Date;
}
