/* eslint-disable @typescript-eslint/naming-convention */
import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';

export type ContactDocument = HydratedDocument<Contact>;
@Schema({
  shardKey: {
    region: 1,
  },
})
export class Contact {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public niceName: string;

  @Prop({ type: mongoSchema.Types.Mixed })
  public image: mongoSchema.Types.Mixed;

  @Prop({ required: true })
  public contact_1: string;

  @Prop()
  public contact_2: string;

  @Prop()
  public description: string;

  @Prop({
    required: true,
    enum: regions,
  })
  public region: string;
}

export const contactSchema = SchemaFactory.createForClass(Contact);
