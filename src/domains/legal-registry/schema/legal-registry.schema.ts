import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import regions from '../../../common/elements/regions';

export type LegalRegistryDocument = HydratedDocument<LegalRegistry>;

@Schema({
  id: false,
  shardKey: { region: 1 },
})
export class LegalRegistry {
  @Prop()
  public type: string;

  @Prop()
  public version: number;

  @Prop()
  public modificationSource: string;

  @Prop()
  public date: Date;

  @Prop()
  public agent: string;

  @Prop()
  public userNiceName: string;

  @Prop()
  public userDisplayName: string;

  @Prop({ required: true, enum: regions })
  public region: string;
}
export const legalRegistrySchema = SchemaFactory.createForClass(LegalRegistry);
