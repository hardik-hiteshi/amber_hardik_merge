import { Prop, Schema } from '@nestjs/mongoose';
import rAEscaleEnum from '../../enums/nutritionalKeysEnum/RAEscale.enum';
@Schema({ _id: false })
export class RAEscale {
  @Prop({ default: 0.0 })
  public value: number;
  @Prop({ enum: rAEscaleEnum, default: 'RAE' })
  public unit: string;
}
