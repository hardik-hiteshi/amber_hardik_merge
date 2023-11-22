/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GeoLocationDocument = HydratedDocument<GeoLocation>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class GeoLocation {
  @Prop({ type: Number, required: true, unique: true })
  public network_start_ip: number;

  @Prop({ type: Number, required: true, unique: true })
  public network_last_ip: number;

  @Prop({ type: String, required: true })
  public latitude: string;

  @Prop({ type: String, required: true })
  public longitude: string;

  @Prop({ type: String, required: true, default: 'MACHINE' })
  public region: string;
}

export const geoLocationSchema = SchemaFactory.createForClass(GeoLocation);
