import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Done {
  @Prop()
  public niceName: string;

  @Prop()
  public firstTime: Date;

  @Prop()
  public lastTime: Date;

  @Prop()
  public cooked: number;
}
