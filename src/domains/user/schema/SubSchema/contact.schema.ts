import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Contact {
  @Prop()
  public phone: string;

  @Prop({ require: [true, 'Please provide a email'], unique: true })
  public mail: string;
}
