import { Prop, Schema } from '@nestjs/mongoose';
import { From } from './from.subSchema';
import { To } from './to.subSchema';

@Schema()
export class Translations {
  @Prop()
  public from: From;

  @Prop([To])
  public to: To;

  @Prop()
  public preserve: boolean;
}
