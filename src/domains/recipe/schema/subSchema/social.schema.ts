import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Social {
  @Prop()
  public favorite: number;

  @Prop()
  public facebook: number;

  @Prop()
  public comments: number;

  @Prop()
  public ratings: number;

  @Prop()
  public todo: number;
}
