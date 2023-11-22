import {
  Categories,
  Comments,
  Group,
  Info,
  Ratings,
  Social,
  Source,
} from './subSchema/index';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import difficultyEnum from './subSchema/enums/difficulty.enum';
import { Grants } from './subSchema/grants.schema';
import { NutritionalKeys } from './subSchema/nutritionalkeys/nutritionalkeys.schema';
import recipecourses from './subSchema/enums/recipecourse.enum';
import recipeRegions from '../schema/subSchema/enums/recipe.regions';
import { RecipeStatus } from './subSchema/status.schema';
import { RecipeTranslations } from './subSchema/translations/recipetranslations.schema';
import { Seo } from './subSchema/seo/seo.schema';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Recipe {
  @Prop()
  public title: string;

  @Prop()
  public niceName: string;

  @Prop()
  public category: string;

  @Prop()
  public categoryNiceName: string;

  @Prop({ type: mongooseSchema.Types.ObjectId })
  public catId: mongooseSchema.Types.ObjectId;

  @Prop()
  public rate: number;

  @Prop(Categories)
  public categories: Categories[];

  @Prop([{ type: String, enum: recipecourses }])
  public course: string[];

  @Prop({ type: Object, ref: 'User' })
  public user: object;

  @Prop(Info)
  public info: Info;

  @Prop()
  public totalTime: number;

  @Prop()
  public cookTime: number;

  @Prop({ enum: difficultyEnum, min: 1, max: 3 })
  public difficulty: number;

  @Prop({ min: 1, max: 3 })
  public price: number;

  @Prop({ type: Object })
  public size: object;

  @Prop(RecipeStatus)
  public status: RecipeStatus;

  @Prop([String])
  public foodGroups: string[];

  @Prop([String])
  public images: string[];

  @Prop([String])
  public videos: string[];

  @Prop([Group])
  public groups: Group[];

  @Prop([String])
  public tags: string[];

  @Prop(Social)
  public social: Social;

  @Prop(Comments)
  public comments: Comments[];

  @Prop(Ratings)
  public ratings: Ratings[];

  @Prop(Source)
  public source: Source;

  @Prop(Grants)
  public grants: Grants;

  @Prop({ type: NutritionalKeys, default: {} })
  public nutritional: NutritionalKeys;

  @Prop()
  public nutritionalForRation: boolean;

  @Prop({ type: String })
  public advice: string;

  @Prop(Seo)
  public seo: Seo;

  @Prop([{ type: mongooseSchema.Types.Mixed }])
  public rations: mongooseSchema.Types.Mixed[];

  @Prop(RecipeTranslations)
  public translations: RecipeTranslations;

  @Prop()
  public imageRights: boolean;

  @Prop({ enum: recipeRegions })
  public region: string;

  @Prop({
    type: String,
  })
  public viewUrl: string;

  @Prop({
    type: String,
  })
  public copyUrl: string;

  @Prop({ type: mongooseSchema.Types.Mixed })
  public compatibility: object;
}
export const recipeSchema = SchemaFactory.createForClass(Recipe);
