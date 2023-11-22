import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineInfoDocument = HydratedDocument<MachineInfo>;

@Schema({ _id: false })
export class MachineInfo {
  @Prop([String])
  public guests: string[];

  @Prop({ type: String, ref: 'User' })
  public owner: string;

  @Prop()
  public registrationDate: Date;

  @Prop()
  public region: string;
}
