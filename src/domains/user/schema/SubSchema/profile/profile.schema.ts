import { Prop, Schema } from '@nestjs/mongoose';
import { SocialMedia } from './socialmedia.subschema';
@Schema({ _id: false })
export class Profile {
  @Prop()
  public diet: string;

  @Prop(SocialMedia)
  public social: SocialMedia;

  @Prop()
  public about: string;

  @Prop()
  public birthday: string;

  @Prop()
  public language: string;

  @Prop()
  public lastViewNotifications: Date;

  @Prop()
  public lastViewNews: Date;
}
