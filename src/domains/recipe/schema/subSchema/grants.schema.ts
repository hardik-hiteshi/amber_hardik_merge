import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Grants {
  @Prop()
  public _: string;

  @Prop([{ type: String }])
  public view: string[];

  @Prop([{ type: String }])
  public search: string[];
}

export const grantsSchema = SchemaFactory.createForClass(Grants);
