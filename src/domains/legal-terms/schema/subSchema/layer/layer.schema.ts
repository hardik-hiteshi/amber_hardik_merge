import { Prop, Schema } from '@nestjs/mongoose';
import { LayerNested } from './layer.subschema';
@Schema({
  _id: false,
  shardKey: {
    region: 1,
  },
})
export class Layer {
  @Prop({ default: false })
  public enabled: boolean;

  @Prop({ default: false })
  public preChecked: boolean;

  @Prop({ default: false })
  public forceValidation: boolean;

  @Prop({ default: false })
  public forceUpdate: boolean;

  @Prop()
  public introductionTitle: string;

  @Prop()
  public introductionText: string;

  @Prop()
  public validationText: string;

  @Prop()
  public validationNewsletter: string;

  @Prop([LayerNested])
  public layer: LayerNested[];
}
