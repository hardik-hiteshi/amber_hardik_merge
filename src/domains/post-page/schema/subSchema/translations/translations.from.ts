import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class PostPageTranslationsFrom {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;
}
