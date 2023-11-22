import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class PostCategoryTranslationsTo {
  @Prop()
  public region: string;
  @Prop()
  public niceName: string;
  @Prop()
  public lastUpdate: Date;
}
