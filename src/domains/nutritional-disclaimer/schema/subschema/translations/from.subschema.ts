import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ shardKey: { region: 1 }, _id: false })
export class NutritionalDisclaimerFrom {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;
}
