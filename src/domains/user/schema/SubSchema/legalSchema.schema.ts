import { Prop, Schema } from '@nestjs/mongoose';
import { ConditionHistory } from './conditionHistory.schema';
@Schema({ _id: false })
export class LegalSchema {
  @Prop()
  public agree: boolean;

  @Prop()
  public version: number;

  @Prop()
  public dateAgreement: Date;

  @Prop([ConditionHistory])
  public history: ConditionHistory[];
}
