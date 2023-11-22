/* eslint-disable @typescript-eslint/naming-convention */
import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type AffiliateContactDocument = HydratedDocument<AffiliateContact>;

@Schema({
  timestamps: true,
})
export class AffiliateContact extends Document {
  @Prop({ required: true })
  public topic: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public last_name: string;

  @Prop({ required: true })
  public email: string;

  @Prop()
  public city: string;

  @Prop()
  public province: string;

  @Prop()
  public fiscal_address: string;

  @Prop()
  public cp: string;

  @Prop()
  public webSite: string;

  @Prop()
  public phone: string;

  @Prop()
  public message: string;

  @Prop()
  public company_name: string;

  @Prop()
  public cif: string;

  @Prop()
  public instagram: string;

  @Prop()
  public facebook: string;

  @Prop()
  public twitter: string;

  @Prop()
  public youtube: string;

  @Prop({ required: true, default: 'Pending', enum: ['Pending', 'Solved'] })
  public status: string;

  @Prop({ type: Date })
  public date: Date;

  @Prop()
  public isCompany: boolean;

  // @Pre('save')
  // public async preSave(next: () => void): Promise<void> {
  //   if (this.isNew || this.isModified('topic')) {
  //     const email = process.env.affiliates_admin;
  //     await mailer(this.email, this, 'contactUser');
  //     await mailer(email, this, 'contactAdmin');
  //   }

  //   next();
  // }
}

export const affiliateContactSchema =
  SchemaFactory.createForClass(AffiliateContact);
