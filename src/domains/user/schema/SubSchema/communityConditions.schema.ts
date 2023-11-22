import { Prop, Schema } from '@nestjs/mongoose';
import { ConditionHistory } from './conditionHistory.schema';

@Schema({ _id: false })
export class CommunityConditions {
  @Prop()
  public dateAgreement: Date;

  @Prop()
  public version: number;

  @Prop([ConditionHistory])
  public history: ConditionHistory[];
}
