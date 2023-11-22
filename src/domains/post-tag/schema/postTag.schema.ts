import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PostTagUrl } from './subSchema/url.subSchema';
import regions from 'src/common/elements/regions';
export type PostTagDocument = HydratedDocument<PostTag>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class PostTag {
  @Prop({ required: true })
  public text: string;

  @Prop()
  public description: string;

  @Prop(PostTagUrl)
  public cms: PostTagUrl;

  @Prop({ required: true, enum: regions })
  public region: string;
}

export const postTagSchema = SchemaFactory.createForClass(PostTag);
