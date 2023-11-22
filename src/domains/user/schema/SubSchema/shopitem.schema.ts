import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ShopItem {
  @Prop()
  public ingredient: string;

  @Prop()
  public qty: string;

  @Prop()
  public unit: string;
}
