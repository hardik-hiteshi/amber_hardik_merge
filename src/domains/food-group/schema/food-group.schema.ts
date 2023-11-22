import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import regions from 'src/common/enum/region.enum';
import { Translations } from './subSchema/translate.subSchema';

export type FoodGroupDocument = HydratedDocument<FoodGroup>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class FoodGroup {
  @Prop({ required: true })
  public niceName: string;

  @Prop()
  public name: string;

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop()
  public mustShow: boolean;

  @Prop([String])
  public image: string[];

  @Prop()
  public translations: Translations;
}
export const foodGroupSchema = SchemaFactory.createForClass(FoodGroup);
