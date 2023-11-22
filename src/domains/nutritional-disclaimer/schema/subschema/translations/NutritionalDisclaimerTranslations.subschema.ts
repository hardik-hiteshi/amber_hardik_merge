import { Prop, Schema } from '@nestjs/mongoose';
import { NutritionalDisclaimerFrom } from './from.subschema';
import { NutritionalDisclaimerTo } from './to.subschema';

@Schema({ shardKey: { region: 1 }, _id: false })
export class NutritionalDisclaimerTranslations {
  @Prop(NutritionalDisclaimerFrom)
  public from: NutritionalDisclaimerFrom;

  @Prop([NutritionalDisclaimerTo])
  public to: NutritionalDisclaimerTo[];

  @Prop()
  public preserve: boolean;
}
