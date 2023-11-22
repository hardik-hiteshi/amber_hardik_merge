import { Prop, Schema } from '@nestjs/mongoose';
import { GeoSchema } from './geo.schema';

export interface IlastLogin {
  date: Date;
  ip: string;
  geo: GeoSchema;
  userAgent: string;
}
@Schema({ _id: false })
export default class LastLogin {
  @Prop()
  public date: Date;

  @Prop()
  public ip: string;

  @Prop()
  public geo: GeoSchema;

  @Prop()
  public userAgent: string;
}
// export const LastLoginSchema = SchemaFactory.createForClass(LastLogin);
