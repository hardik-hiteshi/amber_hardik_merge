import { Prop, Schema } from '@nestjs/mongoose';
import { ConditionHistory } from './conditionHistory.schema';

@Schema({ _id: false })
export class OtherConditions {
  @Prop()
  public dateAgreement: Date;
  @Prop([ConditionHistory])
  public history: ConditionHistory[];
}
