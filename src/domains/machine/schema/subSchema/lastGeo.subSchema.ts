import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class LastGeo {
  @Prop()
  public lat: number;

  @Prop()
  public lng: number;
}
