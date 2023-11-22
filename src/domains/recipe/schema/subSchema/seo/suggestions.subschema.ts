import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Suggestions {
  @Prop({ type: Types.ObjectId })
  public id: Types.ObjectId;

  @Prop()
  public title: string;

  @Prop()
  public niceName: string;
}
