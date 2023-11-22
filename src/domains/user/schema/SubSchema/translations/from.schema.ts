import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export default class From {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;
}
