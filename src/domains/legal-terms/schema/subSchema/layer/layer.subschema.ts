import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class LayerNested {
  @Prop()
  public title: string;

  @Prop()
  public shortText: string;

  @Prop()
  public legalText: string;
}
