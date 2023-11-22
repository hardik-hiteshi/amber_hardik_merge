import { Prop, Schema } from '@nestjs/mongoose';
import { GestStockState } from '../history/history';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class GestStocks {
  @Prop()
  public clientRef: string;

  @Prop()
  public currentState: string;

  @Prop()
  public carrier: string;

  @Prop(GestStockState)
  public history: GestStockState;
}
