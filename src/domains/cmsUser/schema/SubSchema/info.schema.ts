import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Info {
  @Prop()
  public creationDate: Date;

  @Prop()
  public modificationDate: Date;

  @Prop()
  public creationSource: string;

  @Prop()
  public modificationSource: string;
}
