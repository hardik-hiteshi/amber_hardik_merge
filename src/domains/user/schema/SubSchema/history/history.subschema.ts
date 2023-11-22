import { Prop, Schema } from '@nestjs/mongoose';
import { GeoSchema } from '../geo.schema';
@Schema({ _id: false })
export class HistorySubSchema {
  @Prop()
  public date: Date;

  @Prop()
  public ip: string;

  @Prop(GeoSchema)
  public geo: GeoSchema;

  @Prop()
  public userAgent: string;
}
