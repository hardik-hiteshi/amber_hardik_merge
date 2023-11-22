import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class IUscale {
  @Prop({ default: 0.0 })
  public value: number;

  @Prop({ enum: ['IU'], default: 'IU' })
  public unit: string;
}
