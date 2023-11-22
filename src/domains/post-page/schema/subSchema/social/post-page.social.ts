import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PostPageSocial {
  @Prop({ default: 0 })
  public comments: number;
}
