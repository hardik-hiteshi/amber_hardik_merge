import {
  Community,
  InternationalConditons,
  Layer,
  LegalTermsInfo,
} from './subSchema/index';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import legalTermsRegions from './subSchema/enum/legal-terms.region.enum';

export type LegalTermsDocument = HydratedDocument<LegalTerms>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class LegalTerms {
  @Prop({ enum: legalTermsRegions })
  public region: string;

  @Prop({ min: 0, default: 0 })
  public version: number;

  @Prop()
  public startDate: Date;

  @Prop()
  public finishDate: Date;

  @Prop()
  public type: string;

  @Prop(Layer)
  public memberConditions: Layer;

  @Prop(Community)
  public communityConditions: Community;

  @Prop(InternationalConditons)
  public internationalConditions: InternationalConditons;

  @Prop(Layer)
  public newsletterConditions: Layer;

  @Prop(Layer)
  public ebookConditions: Layer;

  @Prop(Layer)
  public contactConditions: Layer;

  @Prop(Layer)
  public telesalesConditions: Layer;

  @Prop(Layer)
  public ecommerceGuestConditions: Layer;

  @Prop(Community)
  public termsOfSale: Community;

  @Prop(Layer)
  public affiliateContactConditions: Layer;

  @Prop(LegalTermsInfo)
  public info: LegalTermsInfo;
}
export const legalTermsSchema = SchemaFactory.createForClass(LegalTerms);
