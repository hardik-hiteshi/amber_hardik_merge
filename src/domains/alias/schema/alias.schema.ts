import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AliasDocument = HydratedDocument<Alias>;
@Schema()
export class Alias {
  @Prop({ required: true, unique: true })
  public niceName: string;

  @Prop()
  public model: string;

  @Prop()
  public alias: string;
}

export const aliasSchema = SchemaFactory.createForClass(Alias);
