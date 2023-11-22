import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LHcommunityConditions } from './subSchema/legal-history.community.subschema';
import { LHInfo } from './subSchema/legal-history.info.subschema';
import { LHinternationalConditions } from './subSchema/legal-history.internationalConditions.subschema';
import { LHLayer } from './subSchema/layer/legal-history.layer.subschema';
import regions from 'src/common/enum/region.enum';

export type LegalHistoryDocument = HydratedDocument<LegalHistory>;

@Schema({})
export class LegalHistory {
  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop({ min: 0, default: 0 })
  public version: number;

  @Prop()
  public startDate: Date;

  @Prop()
  public finishDate: Date;

  @Prop()
  public type: string;

  @Prop(LHLayer)
  public memberConditions: LHLayer;

  @Prop(LHcommunityConditions)
  public communityConditions: LHcommunityConditions;

  @Prop(LHinternationalConditions)
  public internationalConditions: LHinternationalConditions;

  @Prop(LHLayer)
  public newsletterConditions: LHLayer;

  @Prop(LHLayer)
  public ebookConditions: LHLayer;

  @Prop(LHLayer)
  public contactConditions: LHLayer;

  @Prop(LHLayer)
  public ecommerceGuestConditions: LHLayer;

  @Prop(LHcommunityConditions)
  public termsOfSale: LHcommunityConditions;

  @Prop(LHLayer)
  public affiliateContactConditions: LHLayer;

  @Prop(LHInfo)
  public info: LHInfo;
}
export const legalhistorySchema = SchemaFactory.createForClass(LegalHistory);
