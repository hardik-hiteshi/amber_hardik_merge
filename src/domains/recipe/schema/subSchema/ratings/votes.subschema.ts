import { Prop, Schema } from '@nestjs/mongoose';
@Schema()
export class Votes {
  @Prop()
  public good: number;

  @Prop()
  public bad: number;
}
