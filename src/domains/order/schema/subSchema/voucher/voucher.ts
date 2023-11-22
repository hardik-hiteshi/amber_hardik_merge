import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class Voucher {
  @Prop()
  public code: string;

  @Prop({ enum: ['applied', 'invalid', 'expired'] })
  public status: string;

  @Prop()
  public message: string;

  @Prop()
  public type: string;

  @Prop()
  public multiplier: number;
}
