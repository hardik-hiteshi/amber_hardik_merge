import { Prop, Schema } from '@nestjs/mongoose';
import { CommentsReply } from './commentsreply.subschema';
import { Schema as mongooseSchema } from 'mongoose';
@Schema()
export class Comments {
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

  @Prop()
  public comments: CommentsReply[];

  @Prop({ default: false })
  public hide: boolean;

  @Prop([mongooseSchema.Types.Mixed])
  public image: mongooseSchema.Types.Mixed[];

  @Prop({ default: false })
  public haveImage: boolean;
}
