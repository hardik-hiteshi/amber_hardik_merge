import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import factorymachinetypes from './subSchema/enums/factorymachinetype.enum';
import { HydratedDocument } from 'mongoose';

export type FactoryDocument = HydratedDocument<Factory>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Factory {
  @Prop({ required: true, enum: factorymachinetypes })
  public machineType: string;

  @Prop()
  public validBatch: string;

  @Prop()
  public validCompatCode: string;

  @Prop()
  public validSerialRange: string;

  @Prop()
  public validSecretRange: string;

  @Prop()
  public validCdRange: string;

  @Prop()
  public ip: string;

  @Prop()
  public enabled: boolean;

  @Prop({
    required: true,
    default: 'MACHINE',
  })
  public region: string;
}

export const factorySchema = SchemaFactory.createForClass(Factory);
