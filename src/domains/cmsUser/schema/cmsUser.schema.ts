import {
  CmsHistory,
  CmsProfile,
  Contact,
  Info,
  Location,
  Name,
} from './SubSchema/index';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CmsUserDocument = HydratedDocument<CmsUser>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class CmsUser {
  @Prop(Name)
  public name: Name;

  @Prop(Location)
  public location: Location;

  @Prop(Contact)
  public contact: Contact;

  @Prop(CmsHistory)
  public history: CmsHistory;

  @Prop({ required: true })
  public login: string;

  @Prop({ required: [true, 'Please provide a niceName'] })
  public niceName: string;

  @Prop({ required: true })
  public password: string;

  @Prop(CmsProfile)
  public profile: CmsProfile;

  @Prop([String])
  public image: string[];

  @Prop({ default: 'admin' })
  public role: string;

  @Prop(Info)
  public info: Info;

  @Prop()
  public region: string;

  @Prop()
  public allowedRegions: string[];
}
export const cmsUserSchema = SchemaFactory.createForClass(CmsUser);
