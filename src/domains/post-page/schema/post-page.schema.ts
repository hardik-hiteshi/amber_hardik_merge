import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PageAutoPublish } from './subSchema/autoPublish/autoPublish.subschema';
import { PageComments } from './subSchema/comments/comments.subschema';
import { PostPageCMS } from './subSchema/cms/post-page.cms.subschema';
import { PostPageSocial } from './subSchema/social/post-page.social';
import { PostPageTranslations } from './subSchema/translations/translations.subSchema';
import regions from 'src/common/enum/region.enum';

export type PostPageDocument = HydratedDocument<PostPage>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class PostPage {
  @Prop({ default: false })
  public isActive: boolean;

  @Prop({ default: false })
  public isVisibleHome: boolean;

  @Prop({ required: true })
  public title: string;

  @Prop({ type: Date })
  public date: Date;

  @Prop(PageAutoPublish)
  public autopublishDate: PageAutoPublish;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Author' })
  public author: mongooseSchema.Types.ObjectId;

  @Prop({ type: [mongooseSchema.Types.ObjectId], ref: 'PostCategory' })
  public category: mongooseSchema.Types.ObjectId[];

  @Prop({ type: [mongooseSchema.Types.ObjectId], ref: 'PostTag' })
  public tags: mongooseSchema.Types.ObjectId[];

  @Prop()
  public imageHeader: string;

  @Prop()
  public imagePreview: string;

  @Prop({ required: true })
  public shortDescription: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ type: [mongooseSchema.Types.ObjectId], ref: 'PostPage' })
  public posts: mongooseSchema.Types.ObjectId[];

  @Prop([PageComments])
  public comments: PageComments[];

  @Prop(PostPageCMS)
  public cms: PostPageCMS;

  @Prop(PostPageSocial)
  public social: PostPageSocial;

  @Prop(PostPageTranslations)
  public translations: PostPageTranslations;

  @Prop({ required: true, enum: regions })
  public region: string;
}

export const postPageSchema = SchemaFactory.createForClass(PostPage);
