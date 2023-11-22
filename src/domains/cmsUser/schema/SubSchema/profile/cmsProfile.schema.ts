import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CmsProfile {
  @Prop()
  public birthday: string;

  @Prop()
  public language: string;
}
