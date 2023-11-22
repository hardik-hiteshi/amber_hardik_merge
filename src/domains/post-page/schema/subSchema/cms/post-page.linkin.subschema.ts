import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PostPageLinkin {
  @Prop()
  public text: string;

  @Prop()
  public url: string;
}
