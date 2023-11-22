import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class GestStockState {
  @Prop()
  public state: string;

  @Prop()
  public date: Date;
}
