import { Prop, Schema } from '@nestjs/mongoose';
import { RecipeFrom } from './translationsSubschema/from.subschema';
import { RecipeTo } from './translationsSubschema/to.subschema';
@Schema({ _id: false })
export class RecipeTranslations {
  @Prop(RecipeFrom)
  public from: RecipeFrom;

  @Prop([RecipeTo])
  public to: RecipeTo[];

  @Prop()
  public preserve: boolean;
}
