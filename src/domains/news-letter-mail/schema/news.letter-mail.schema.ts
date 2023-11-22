import { NewsLetterMailChimp, NewsLetterMautic } from './subschema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import regions from 'src/common/enum/region.enum';

export type NewsLetterMailDocument = HydratedDocument<NewsLetterMail>;
@Schema({
  shardKey: { region: 1 },
})
export class NewsLetterMail {
  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop()
  public emailAddress: string;

  @Prop({ required: true, type: NewsLetterMailChimp })
  public mailchimp: NewsLetterMailChimp;

  @Prop(NewsLetterMautic)
  public mautic: NewsLetterMautic;
}

export const newsLetterMailSchema =
  SchemaFactory.createForClass(NewsLetterMail);
