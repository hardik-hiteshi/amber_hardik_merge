import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class EnergyScale {
  @Prop({ default: 0.0 })
  public value: number;

  @Prop({ enum: ['Kcal'], default: 'Kcal' })
  public unit: string;
}
