import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class NewsLetterMautic {
  @Prop()
  public mauticID: string;

  @Prop()
  public subscribeDate: Date;
}
