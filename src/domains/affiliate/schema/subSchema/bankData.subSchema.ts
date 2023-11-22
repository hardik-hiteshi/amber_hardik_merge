/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BankData {
  @Prop({ type: Boolean, default: false })
  public send_data: boolean;
}
