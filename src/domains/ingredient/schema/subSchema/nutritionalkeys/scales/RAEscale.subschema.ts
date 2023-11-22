import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class RAEscale {
  @Prop({ default: 0.0 })
  public value: number;

  @Prop({ enum: ['RAE'], default: 'RAE' })
  public unit: string;
}
