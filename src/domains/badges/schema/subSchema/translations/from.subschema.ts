import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export default class From {
  @Prop({ type: String, readonly: true, class: 'col-md-6' })
  public region: string;

  @Prop({ type: String, readonly: true, class: 'col-md-6' })
  public niceName: string;
}
