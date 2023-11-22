import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Extra {
  @Prop()
  public title: string;

  @Prop()
  public text: string;
}
