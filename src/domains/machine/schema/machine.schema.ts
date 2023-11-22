import { MachineHistory, MachineInfo, MachineSerial } from './subSchema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LastGeo } from './subSchema/lastGeo.subSchema';
import machinestatus from './subSchema/enums/machinestatus.enum';

export type MachineDocument = HydratedDocument<Machine>;

@Schema()
export class Machine {
  @Prop()
  public mac: string;

  @Prop()
  public manufactureDate: Date;

  @Prop()
  public model: string;

  @Prop()
  public purchaseDate: Date;

  @Prop()
  public secret: string;

  @Prop({ type: MachineSerial, required: true })
  public serial: MachineSerial;

  @Prop(MachineInfo)
  public info: MachineInfo;

  @Prop()
  public lastLogin: Date;

  @Prop()
  public lastIP: string;

  @Prop()
  public lastUser: string;

  @Prop(LastGeo)
  public lastGeo: LastGeo;

  @Prop()
  public lastUserAgent: string;

  @Prop()
  public lastLoginFail: Date;

  @Prop()
  public lastIPFail: string;

  @Prop(LastGeo)
  public lastGeoFail: LastGeo;

  @Prop()
  public lastUserAgentFail: string;

  @Prop([MachineHistory])
  public history: MachineHistory[];

  @Prop({
    type: String,
    default: 'enabled',
    enum: machinestatus,
  })
  public status: string;

  @Prop({ default: 'MACHINE', enum: ['MACHINE'] })
  public region: string;
}

export const machineSchema = SchemaFactory.createForClass(Machine);
