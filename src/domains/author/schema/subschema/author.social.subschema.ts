import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class AuthorSocial {
  @Prop()
  public gplus: string;

  @Prop()
  public twitter: string;

  @Prop()
  public instagram: string;
}
