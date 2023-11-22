import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class GeoSchema {
  @Prop()
  public lat: number;

  @Prop()
  public lng: number;
}
