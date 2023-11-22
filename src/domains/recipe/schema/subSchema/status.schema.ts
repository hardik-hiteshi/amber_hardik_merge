import { Prop, Schema } from '@nestjs/mongoose';
import nutritionalEnum from './enums/status.nutritional.enum';

@Schema({ _id: false })
export class RecipeStatus {
  @Prop()
  public exportable: boolean;

  @Prop()
  public verified: boolean;

  @Prop({ ref: 'Recipe' })
  public idParent: string;

  @Prop({ enum: nutritionalEnum })
  public nutritional: string;
}
