import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
  shardKey: {
    region: 1,
  },
})
export class LegalTermsInfo {
  @Prop()
  public modificationDate: Date;

  @Prop()
  public modificationSource: string;
}
