import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NewsMedia } from './subSchema/newsMedia.subSchema';
import regions from 'src/common/enum/region.enum';

export type NewsDocument = HydratedDocument<News>;
@Schema({
  shardKey: { region: 1 },
})
export class News {
  @Prop()
  public niceName: string;

  @Prop({ default: new Date().toISOString() })
  public date: Date;

  @Prop()
  public scheduleStart: Date;

  @Prop()
  public scheduleEnd: Date;

  @Prop({ maxlength: 50 })
  public textSkill1: string;

  @Prop({ maxlength: 50 })
  public textSkill2: string;

  @Prop({ maxlength: 50 })
  public text1: string;

  @Prop({ maxlength: 500 })
  public text2: string;

  @Prop({ maxlength: 150 })
  public text3: string;

  @Prop()
  public video: string;

  @Prop([String])
  public image: string[];

  @Prop({ default: true })
  public enabled: boolean;

  @Prop(NewsMedia)
  public media: NewsMedia;

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop({ enum: ['none', 'url', 'video', 'recipes'], required: true })
  public type: string;

  @Prop({ type: [String], ref: 'Recipe' })
  public recipes: string[];
}

export const newsSchema = SchemaFactory.createForClass(News);
