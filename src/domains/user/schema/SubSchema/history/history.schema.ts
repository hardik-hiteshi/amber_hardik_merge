import { Prop, Schema } from '@nestjs/mongoose';
import { HistorySubSchema } from './history.subschema';
import LastLogin from '../lastlogin.schema';

@Schema({ _id: false })
export class History {
  @Prop()
  public registration: Date;

  @Prop()
  public unregistration: Date;

  @Prop({ type: LastLogin, default: {} })
  public lastLoginCMS: LastLogin;

  @Prop(HistorySubSchema)
  public lastLoginWeb: HistorySubSchema;

  @Prop(HistorySubSchema)
  public lastLoginApp: HistorySubSchema;

  @Prop(HistorySubSchema)
  public lastLoginMachine: HistorySubSchema;
}
