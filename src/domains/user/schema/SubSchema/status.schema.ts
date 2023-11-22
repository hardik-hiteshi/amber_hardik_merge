import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Status {
  @Prop()
  public advertisement: boolean;

  @Prop()
  public taurusInfo: boolean;

  @Prop()
  public commercials: boolean;

  @Prop()
  public promo: boolean;

  @Prop()
  public publicProfile: boolean;

  @Prop()
  public feedback: boolean;

  @Prop()
  public newsletter: boolean;

  @Prop()
  public privacy: boolean;
}
