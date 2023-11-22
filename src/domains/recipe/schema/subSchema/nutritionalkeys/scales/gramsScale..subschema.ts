import { Prop, Schema } from '@nestjs/mongoose';
import gramScaleEnum from '../../enums/nutritionalKeysEnum/gramScale.enum';
@Schema({ _id: false })
export class GramsScale {
  @Prop({ default: 0.0 })
  public value: number;
  @Prop({ enum: gramScaleEnum, default: 'g' })
  public unit: string;
}
