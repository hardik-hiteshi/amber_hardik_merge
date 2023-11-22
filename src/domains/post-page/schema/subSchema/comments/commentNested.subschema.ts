import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class PageNestedComments {
  @Prop({ type: Date, required: true })
  public date: Date;

  @Prop({ required: true })
  public displayName: string;

  @Prop({ required: true })
  public niceName: string;

  @Prop({ required: true })
  public rank: string;

  @Prop({ required: true })
  public text: string;
}
