import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class NewsLetterMailChimp {
  @Prop()
  public mailchimpID: string;

  @Prop()
  public subscribeDate: Date;
}
