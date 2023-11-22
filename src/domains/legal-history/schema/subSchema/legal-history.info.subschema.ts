import { Prop, Schema } from '@nestjs/mongoose';
@Schema()
export class LHInfo {
  @Prop()
  public modificationDate: Date;

  @Prop()
  public modificationSource: string;
}
