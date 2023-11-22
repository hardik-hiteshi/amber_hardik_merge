import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
})
export class PostCategorySEO {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public description: string;
}
