import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import advertisementRegions from './subSchema/enums/advertisementregion.enum';

export type AdvertisementDocument = HydratedDocument<Advertisement>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Advertisement {
  @Prop()
  public niceName: string;

  @Prop()
  public date: Date;

  @Prop({
    //type: mongooseSchema.Types.ObjectId,
    ref: 'Category',
  })
  public category: string;

  @Prop()
  public url: string;

  @Prop()
  public urlTitle: string;

  @Prop({ type: Number, default: 0 })
  public views: number;

  @Prop({ type: Number, default: 0 })
  public clicks: number;

  @Prop({ required: true, enum: advertisementRegions })
  public region: string;

  @Prop({ type: mongooseSchema.Types.Mixed, format: 'mycook-image' })
  public image: mongooseSchema.Types.Mixed;
}
export const advertisementSchema = SchemaFactory.createForClass(Advertisement);
