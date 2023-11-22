import { Prop, Schema } from '@nestjs/mongoose';
import { Ingredient } from './ingredients.subschema';
import stepFunction from '../enums/stepfunction.enum';
import stepType from '../enums/steptype.enum';

// @Schema({ _id: false })
@Schema()
export class Steps {
  @Prop()
  public description: string;

  @Prop({ default: 'mycook', enum: stepType })
  public type: string;

  @Prop({ min: 0 })
  public cookTime: number;

  @Prop()
  public temperature: string;

  @Prop()
  public speed: string;

  @Prop({ min: 0 })
  public outsideTemperature: number;

  @Prop({ min: 0 })
  public microwaveWatts: number;

  @Prop({ min: 0 })
  public stepTime: number;

  @Prop([
    {
      type: String,
      enum: [
        'SplashCover',
        'mixingBlade',
        'noMeasureCup',
        'basket',
        'reverseBasket',
        'spatula',
        'steamer',
        'plug',
      ],
    },
  ])
  public accessories: string[];

  @Prop([Ingredient])
  public ingredients: Ingredient[];

  @Prop({
    enum: stepFunction,
  })
  public function: string;

  @Prop({ default: false })
  public haveImage: boolean;
}
