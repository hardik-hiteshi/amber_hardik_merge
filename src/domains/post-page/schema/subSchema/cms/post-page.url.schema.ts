import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type PostCategoryUrlDocument = HydratedDocument<PostPageURL>;

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PostPageURL {
  @Prop({
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  })
  public slug: string;

  @Prop({ type: String })
  public fullUrl: string;
}

export const postCategorySlugSchema = SchemaFactory.createForClass(PostPageURL);
