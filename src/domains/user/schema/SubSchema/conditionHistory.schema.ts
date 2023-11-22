import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class ConditionHistory {
  @Prop()
  public version: number;

  @Prop()
  public dateAgreement: Date;
}
