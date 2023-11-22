import { Prop, Schema } from '@nestjs/mongoose';
import { Steps } from './steps.subschema';

@Schema({ _id: false })
export class Group {
  @Prop()
  public name: string;

  @Prop()
  public steps: Steps[];
}
