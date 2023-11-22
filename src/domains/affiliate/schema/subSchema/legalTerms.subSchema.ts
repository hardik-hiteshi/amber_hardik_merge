import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class LegalTerms {
  @Prop({ type: Boolean, default: false })
  public agree: boolean;

  @Prop({ type: Date })
  public dateAgreement: Date;
}
