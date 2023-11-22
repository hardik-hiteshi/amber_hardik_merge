/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineLogDocument = HydratedDocument<MachineLog>;

@Schema()
export class MachineLog {
  @Prop()
  public type: string;

  @Prop()
  public date: Date;

  //Time
  @Prop()
  public t: number;

  //Temperature
  @Prop()
  public T: string;

  //Speed
  @Prop()
  public S: string;

  @Prop()
  public scale: number;

  @Prop()
  public error: string;

  @Prop()
  public serial: string;

  @Prop()
  public wifi_status: string;

  @Prop()
  public wifi_rssi: string;

  @Prop()
  public wifi_signal_strength: string;

  @Prop()
  public wifi_link_speed: string;

  @Prop()
  public wifi_band: number;

  @Prop()
  public wifi_type: string;

  @Prop()
  public wifi_dbm: string;

  @Prop()
  public wifi_protocol: string;

  @Prop()
  public knob_layout_selected: string;

  @Prop()
  public theme_selected: string;

  @Prop()
  public tablet_boot: string;

  @Prop()
  public tablet_time: string;

  @Prop()
  public loginIP: string;

  @Prop()
  public loginRegion: string;

  @Prop({ default: 'MACHINE', enum: ['MACHINE'] })
  public region: string;
}

export const machineLogSchema = SchemaFactory.createForClass(MachineLog);
