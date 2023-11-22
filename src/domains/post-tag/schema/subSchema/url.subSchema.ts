import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PostTagSlug } from './slug.subSchema';

export type PostTagCmsDocument = HydratedDocument<PostTagUrl>;

@Schema()
export class PostTagUrl {
  @Prop(PostTagSlug)
  public url: PostTagSlug;
}

export const productCmsSchema = SchemaFactory.createForClass(PostTagUrl);
