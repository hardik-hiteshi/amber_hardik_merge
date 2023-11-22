import { Prop, Schema } from '@nestjs/mongoose';
import IUscaleEnum from '../../enums/nutritionalKeysEnum/IUScale.enum';
@Schema({ _id: false })
export class IUscale {
  @Prop({ default: 0.0 })
  public value: number;
  @Prop({ enum: IUscaleEnum, default: 'IU' })
  public unit: string;
}
