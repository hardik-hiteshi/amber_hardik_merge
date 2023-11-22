import { Prop, Schema } from '@nestjs/mongoose';
import From from './from.subschema';
import To from './to.subschema';
@Schema({ _id: false })
export class Translations {
  @Prop(From)
  public from: From;

  @Prop([To])
  public to: [To];

  @Prop()
  public preserve: boolean;
}
