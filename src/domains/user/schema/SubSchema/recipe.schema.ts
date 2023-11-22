import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Recipe {
  @Prop()
  public niceName: string;

  @Prop()
  public title: string;
}
