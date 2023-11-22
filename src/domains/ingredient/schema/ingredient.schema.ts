/* eslint-disable @typescript-eslint/naming-convention */
import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NutritionalKeys } from './subSchema/nutritionalkeys/nutritionalkeys.schema';
import regions from 'src/common/enum/region.enum';
import { Translations } from './subSchema/translation.subSchema';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop()
  public niceName: string;

  @Prop([String])
  public alias: string[];

  @Prop()
  public ndb_number: number;

  @Prop({ min: 0 })
  public unitWeight: number;

  @Prop({ min: 0 })
  public density: number;

  @Prop({ enum: ['volume', 'weight', 'unit'] })
  public preferedUnit: string;

  @Prop({ type: NutritionalKeys, default: {} })
  public nutritional: NutritionalKeys;

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop([{ type: mongoSchema.Types.Mixed, ref: 'FoodGroup' }])
  public foodGroup: mongoSchema.Types.Mixed[];

  @Prop({ min: 0 })
  public thresholdQuantity: number;

  @Prop({ min: 0 })
  public fryQuantity: number;

  @Prop({ min: 0 })
  public coatQuantity: number;

  @Prop(Translations)
  public translations: Translations;
}

export const ingredientSchema = SchemaFactory.createForClass(Ingredient);
