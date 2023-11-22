import { Prop, Schema } from '@nestjs/mongoose';
import { DietFrom } from './dietsFrom.subSchema';
import { DietTo } from './dietTo.subSchema';

@Schema()
export class DietTranslations {
  @Prop()
  public from: DietFrom;

  @Prop([DietTo])
  public to: DietTo[];

  @Prop()
  public preserve: boolean;
}
