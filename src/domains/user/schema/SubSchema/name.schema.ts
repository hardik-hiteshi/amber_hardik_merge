import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Name {
  @Prop()
  public displayName: string;

  @Prop()
  public firstName: string;

  @Prop()
  public lastName: string;
}
