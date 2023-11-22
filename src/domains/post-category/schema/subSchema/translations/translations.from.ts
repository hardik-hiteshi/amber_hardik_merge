import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class PostCategoryTranslationsFrom {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;
}
