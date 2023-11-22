import { Prop, Schema } from '@nestjs/mongoose';
@Schema()
export class CommentsReply {
  @Prop({ ref: 'User' })
  public niceName: string;

  @Prop()
  public date: Date;

  @Prop()
  public displayName: string;

  @Prop()
  public rank: string;

  @Prop()
  public text: string;

  @Prop({ default: false })
  public hide: boolean;

  @Prop({ default: false })
  public haveImage: boolean;
}
