/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import badgesNiceNames from './subSchema/enums/BadgesNicenames.enum';
import badgesRegions from './subSchema/enums/BadgesRegion.enums';
import { HydratedDocument } from 'mongoose';
import { Translations } from './subSchema/index';

export type BadgesDocument = HydratedDocument<Badges>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Badges {
  @Prop()
  public name: string;

  @Prop({ enum: badgesNiceNames })
  public niceName: string;

  @Prop()
  public index: number;

  //what is this format
  @Prop({ format: 'mycook-image' })
  public image: string;

  @Prop({ required: true })
  public range: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ format: 'html' })
  public prize_txt: string;

  @Prop()
  public prize: string;

  @Prop()
  public terms: string;

  @Prop({ required: true, enum: badgesRegions })
  public region: string;

  @Prop(Translations)
  public translations: Translations;
}
export const badgesSchema = SchemaFactory.createForClass(Badges);
