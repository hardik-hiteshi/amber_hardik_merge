import { Prop, Schema } from '@nestjs/mongoose';
import { PostCategorySEO } from './post-category.seo.subschema';
import { PostCategoryURL } from './post-category.url.schema';

@Schema({
  shardKey: {
    region: 1,
  },
})
export class PostCategoryCMS {
  @Prop()
  public url: PostCategoryURL;

  @Prop()
  public seo: PostCategorySEO;
}
