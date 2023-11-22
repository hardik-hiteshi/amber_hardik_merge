import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
@Schema()
export class Categories {
  @Prop({ type: mongooseSchema.Types.ObjectId })
  public id?: mongooseSchema.Types.ObjectId;

  @Prop()
  public name?: string;

  @Prop()
  public niceName?: string;
}
