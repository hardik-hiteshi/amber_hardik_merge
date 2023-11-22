import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Location {
  @Prop()
  public address: string;

  @Prop()
  public zip: string;

  @Prop()
  public town: string;

  @Prop()
  public state: string;

  @Prop()
  public country: string;
}
