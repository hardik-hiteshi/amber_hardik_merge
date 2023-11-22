import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class LHinternationalConditions {
  @Prop({ default: false })
  public enabled: boolean;

  @Prop({ default: false })
  public preChecked: boolean;

  @Prop({ default: false })
  public forceValidation: boolean;

  @Prop({ default: false })
  public companiesOneByOne: boolean;

  @Prop({ default: false })
  public shortText: string;

  @Prop({ default: false })
  public introductionTitle: string;

  @Prop({ default: false })
  public introductionText: string;

  @Prop({ default: false })
  public legalText: string;

  @Prop({ default: false })
  public validationText: string;

  @Prop({ type: [String] })
  public companyNames: string[];
}
