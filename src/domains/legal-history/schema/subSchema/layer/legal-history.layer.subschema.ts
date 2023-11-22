import { Prop, Schema } from '@nestjs/mongoose';
import { LHLayerNested } from './legal-history-nested-layer.subschema';

@Schema({ _id: false })
export class LHLayer {
  @Prop({ default: false })
  public enabled: boolean;

  @Prop({ default: false })
  public preChecked: boolean;

  @Prop({ default: false })
  public forceValidation: boolean;

  @Prop()
  public introductionTitle: string;

  @Prop()
  public introductionText: string;

  @Prop()
  public validationText: string;

  @Prop()
  public validationNewsletter: string;

  @Prop([LHLayerNested])
  public layer: LHLayerNested[];
}
