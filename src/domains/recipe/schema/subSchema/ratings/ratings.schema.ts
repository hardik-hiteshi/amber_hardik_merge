import { Prop, Schema } from '@nestjs/mongoose';
import { Replies } from './replies.subschema';
import { Votes } from './votes.subschema';
@Schema()
export class Ratings {
  @Prop()
  public date: Date;

  @Prop()
  public displayName: string;

  @Prop({ ref: 'User' })
  public niceName: string;

  @Prop()
  public rank: string;

  @Prop()
  public text: string;

  @Prop()
  public rate: number;

  @Prop(Votes)
  public votes: Votes;

  @Prop(Replies)
  public replies: Replies[];

  @Prop({ default: false })
  public hide: boolean;

  @Prop({ default: false })
  public haveImage: boolean;
}
