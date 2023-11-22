import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContextFields } from './subSchema/contextFields.subSchema';
import { HydratedDocument } from 'mongoose';
import regions from 'src/common/enum/region.enum';

export type RegionDocument = HydratedDocument<Region>;
@Schema({
  shardKey: { region: 1 },
})
export class Region {
  @Prop({ required: true, enum: regions })
  public niceName: string;

  @Prop({ required: true })
  public language: string;

  @Prop({ required: true })
  public adminUser: string;

  @Prop([ContextFields])
  public contextFields: ContextFields[];

  @Prop()
  public remoteEndPoint: string;

  @Prop({ default: false })
  public autoTags: boolean;
}

export const regionSchema = SchemaFactory.createForClass(Region);
