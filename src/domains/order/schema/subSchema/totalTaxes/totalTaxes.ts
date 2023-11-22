import { Prop, Schema } from '@nestjs/mongoose';
import { Detail } from '../details/details';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class TotalTaxes {
  @Prop({ required: true })
  public total: number;

  @Prop([Detail])
  public detail: Detail[];
}
