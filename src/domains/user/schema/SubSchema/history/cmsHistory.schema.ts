import { Prop, Schema } from '@nestjs/mongoose';
import LastLogin from '../lastlogin.schema';

@Schema({ _id: false })
export class CmsHistory {
  @Prop()
  public registration: Date;

  @Prop({ default: null })
  public unregistration: Date;

  @Prop({ type: LastLogin, default: {} })
  public lastLoginCMS: LastLogin;
}
