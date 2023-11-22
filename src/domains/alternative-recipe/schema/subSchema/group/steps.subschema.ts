import { Prop, Schema } from '@nestjs/mongoose';
import { Ingredient } from './ingredients.subschema';

@Schema({ _id: false })
export class Steps {
  @Prop()
  public description: string;

  @Prop()
  public cookTime: number;

  @Prop()
  public ingredients: Ingredient[];
}
