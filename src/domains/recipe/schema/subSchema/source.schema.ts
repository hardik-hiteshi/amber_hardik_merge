import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Source {
  @Prop()
  public url: string;

  @Prop()
  public name: string;
}
