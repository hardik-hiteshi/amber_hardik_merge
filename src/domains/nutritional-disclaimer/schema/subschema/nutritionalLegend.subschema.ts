import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ shardKey: { region: 1 }, _id: false })
export class NutritionalLegend {
  @Prop()
  public low: string;

  @Prop()
  public medium: string;

  @Prop()
  public high: string;
}
