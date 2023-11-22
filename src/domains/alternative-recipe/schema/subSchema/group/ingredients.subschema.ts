import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Ingredient {
  @Prop()
  public qty: string;

  @Prop()
  public unit: string;

  @Prop()
  public prep: string;

  @Prop()
  public name: string;

  @Prop()
  public extra: string;
}
