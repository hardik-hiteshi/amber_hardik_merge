import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ shardKey: { region: 1 }, _id: false })
export class NutritionalDisclaimerTo {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;

  @Prop()
  public lastUpdate: boolean;
}
