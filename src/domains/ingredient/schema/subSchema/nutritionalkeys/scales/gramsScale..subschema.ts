import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class GramsScale {
  @Prop({ default: 0.0 })
  public value: number;

  @Prop({ enum: ['g', 'mg', 'ug'], default: 'g' })
  public unit: string;
}
