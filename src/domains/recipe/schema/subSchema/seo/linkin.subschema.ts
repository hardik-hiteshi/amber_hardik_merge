import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Linkin {
  @Prop()
  public url: string;

  @Prop()
  public text: string;
}
