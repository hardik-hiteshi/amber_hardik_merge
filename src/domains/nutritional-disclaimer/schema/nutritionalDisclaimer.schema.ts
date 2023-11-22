import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NutritionalDisclaimerTranslations } from './subschema/translations/NutritionalDisclaimerTranslations.subschema';
import { NutritionalLegend } from './subschema/nutritionalLegend.subschema';
import regions from '../../../common/elements/regions';

export type NutritionalDisclaimerDocument =
  HydratedDocument<NutritionalDisclaimer>;

@Schema({ shardKey: { region: 1 } })
export class NutritionalDisclaimer {
  @Prop({ enum: regions, required: true })
  public region: string;

  @Prop()
  public niceName: string;

  @Prop()
  public referenceAdvice: string;

  @Prop()
  public legalText: string;

  @Prop()
  public disclaimerColorCode: string;

  @Prop()
  public methodology: string;

  @Prop()
  public calculateForPax: string;

  @Prop()
  public calculateForRecipe: string;

  @Prop({ type: mongooseSchema.Types.Mixed })
  public nutritionalLogo: mongooseSchema.Types.Mixed;

  @Prop(NutritionalLegend)
  public nutritionalLegend: NutritionalLegend;

  @Prop({ type: NutritionalDisclaimerTranslations })
  public translations: NutritionalDisclaimerTranslations;
}

export const nutritionalDisclaimerSchema = SchemaFactory.createForClass(
  NutritionalDisclaimer,
);
