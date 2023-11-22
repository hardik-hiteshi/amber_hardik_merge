import { Prop, Schema } from '@nestjs/mongoose';
import { PostCategoryTranslationsFrom } from './translations.from';
import { To } from 'src/domains/food-group/schema/subSchema/to.subSchema';
@Schema({ _id: false })
export class PostCategoryTranslations {
  @Prop(PostCategoryTranslationsFrom)
  public from: PostCategoryTranslationsFrom;

  @Prop([To])
  public to: To[];

  @Prop()
  public preserve: boolean;
}
