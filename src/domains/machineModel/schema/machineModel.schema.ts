/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import machineClodVersions from './subSchema/enums/machineClodVersion.enum';
export type MachineModelDocument = HydratedDocument<MachineModel>;

@Schema()
export class MachineModel {
  @Prop({ required: true })
  public code: string;

  @Prop({ required: true })
  public model: string;

  @Prop()
  public country: string;

  @Prop({ required: true })
  public distributor: string;

  @Prop({ required: true })
  public product_platform: string;

  @Prop({ required: true, enum: machineClodVersions })
  public cloudVersion: string;
}

export const machineModelSchema = SchemaFactory.createForClass(MachineModel);
