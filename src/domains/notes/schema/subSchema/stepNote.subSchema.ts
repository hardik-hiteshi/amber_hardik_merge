import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class StepNote {
  @Prop()
  public note: string;
}
