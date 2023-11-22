import { Prop, Schema } from '@nestjs/mongoose';
import { PostPageSEO } from './post-page.seo.subschema';
import { PostPageURL } from './post-page.url.schema';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PostPageCMS {
  @Prop()
  public url: PostPageURL;

  @Prop()
  public seo: PostPageSEO;
}
