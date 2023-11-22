import { Prop, Schema } from '@nestjs/mongoose';
import energyScaleEnum from '../../enums/nutritionalKeysEnum/EnergyScale.enum';
@Schema({ _id: false })
export class EnergyScale {
  @Prop({ default: 0.0 })
  public value: number;
  @Prop({ enum: energyScaleEnum, default: 'Kcal' })
  public unit: string;
}
