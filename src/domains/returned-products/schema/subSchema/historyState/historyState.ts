import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class HistoryState {
  @Prop()
  public state: string;

  @Prop({ required: true, default: Date.now })
  public date: Date;

  @Prop()
  public comments: string;

  @Prop()
  public modificationUser: string;
}
