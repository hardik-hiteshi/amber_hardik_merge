import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineHistoryDocument = HydratedDocument<MachineHistory>;

@Schema({ _id: false })
export class MachineHistory {
  @Prop([String])
  public guests: string[];

  @Prop()
  public owner: string;

  @Prop()
  public registrationDate: Date;

  @Prop()
  public region: string;
}
