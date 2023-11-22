import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class SocialMedia {
  @Prop()
  public instagram: string;

  @Prop()
  public googleplus: string;

  @Prop()
  public twitter: string;

  @Prop()
  public web: string;

  @Prop()
  public webName: string;
}
