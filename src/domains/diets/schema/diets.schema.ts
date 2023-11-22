import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DietTranslations } from './subSchema/deitsTranslate.subSchema';
import regions from 'src/common/enum/region.enum';

export type DietDocument = HydratedDocument<Diet>;
@Schema({
  shardKey: { region: 1 },
})
export class Diet {
  @Prop({ required: true })
  public niceName: string;

  @Prop()
  public name: string;

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop([String])
  public image: string[];

  @Prop([{ type: mongoSchema.Types.Mixed, ref: 'FoodGroup' }])
  public foodGroups: mongoSchema.Types.Mixed[];

  @Prop([String])
  public tags: string[];

  @Prop()
  public translations: DietTranslations;
}

export const dietSchema = SchemaFactory.createForClass(Diet);
