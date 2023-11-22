import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Replies {
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
}
