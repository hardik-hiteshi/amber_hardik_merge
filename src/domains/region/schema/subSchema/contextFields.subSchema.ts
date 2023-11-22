import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: { region: 1 },
  _id: false,
})
export class ContextFields {
  @Prop()
  public regex: string;

  @Prop()
  public context: string;
}
