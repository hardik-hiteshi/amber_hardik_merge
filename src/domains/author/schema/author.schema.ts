import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { AuthorSocial } from './subschema/author.social.subschema';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({
  id: false,
})
export class Author {
  @Prop({ required: true, unique: true })
  public username: string;

  @Prop(AuthorSocial)
  public social: AuthorSocial;

  @Prop([String])
  public image: string[];

  @Prop()
  public bio: string;
}
export const authorSchema = SchemaFactory.createForClass(Author);
