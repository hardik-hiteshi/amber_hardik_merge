import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PriceRange {
  @Prop({ min: 0 })
  public min: number;

  @Prop()
  public max: number;
}
