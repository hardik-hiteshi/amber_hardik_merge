import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class RecipeTo {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;

  @Prop()
  public lastUpdate: Date;
}
