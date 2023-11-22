import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
  shardKey: {
    region: 1,
  },
})
export class InternationalConditons {
  @Prop({ default: false })
  public enabled: boolean;

  @Prop({ default: false })
  public preChecked: boolean;

  @Prop({ default: false })
  public forceValidation: boolean;

  @Prop({ default: false })
  public forceUpdate: boolean;

  @Prop({ default: false })
  public companiesOneByOne: boolean;

  @Prop()
  public shortText: string;

  @Prop()
  public introductionTitle: string;

  @Prop()
  public introductionText: string;

  @Prop()
  public legalText: string;

  @Prop()
  public validationText: string;

  @Prop([String])
  public companyNames: string[];
}
