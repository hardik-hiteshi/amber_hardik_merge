import { Prop, Schema } from '@nestjs/mongoose';
import { PostPageTranslationsFrom } from './translations.from';
import { To } from 'src/domains/food-group/schema/subSchema/to.subSchema';

@Schema({ _id: false })
export class PostPageTranslations {
  @Prop(PostPageTranslationsFrom)
  public from: PostPageTranslationsFrom;

  @Prop([To])
  public to: To[];

  @Prop()
  public preserve: boolean;
}
