import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Blocked {
  @Prop()
  public niceName: string;
}
