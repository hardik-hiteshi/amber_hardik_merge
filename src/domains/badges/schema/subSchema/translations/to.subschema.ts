import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export default class To {
  @Prop({ type: String })
  public region: string;

  @Prop({ type: String })
  public niceName: string;

  @Prop({ type: Date })
  public lastUpdate: Date;
}
