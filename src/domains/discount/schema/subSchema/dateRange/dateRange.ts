import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class DateRange {
  @Prop({ type: Date })
  public begin: Date;

  @Prop({ type: Date })
  public end: Date;
}
