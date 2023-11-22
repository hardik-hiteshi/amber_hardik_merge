import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class LHLayerNested {
  @Prop()
  public title: string;

  @Prop()
  public shortText: string;

  @Prop()
  public legalText: string;
}
