import { Prop, Schema } from '@nestjs/mongoose';
import { PostPageLinkin } from './post-page.linkin.subschema';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PostPageSEO {
  @Prop()
  public title: string;

  @Prop()
  public description: string;

  @Prop({ default: true })
  public index: boolean;

  @Prop({ default: true })
  public follow: boolean;

  @Prop([PostPageLinkin])
  public linkin: PostPageLinkin[];
}
