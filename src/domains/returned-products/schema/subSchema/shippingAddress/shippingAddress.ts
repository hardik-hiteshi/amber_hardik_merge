import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class ShippingAddress {
  @Prop()
  public nameLastName: string;

  @Prop()
  public name: string;

  @Prop()
  public lastName: string;

  @Prop()
  public idcard: string;

  @Prop()
  public address: string;

  @Prop({ maxlength: 8 })
  public zip: string;

  @Prop()
  public state: string;

  @Prop()
  public country: string;

  @Prop()
  public town: string;

  @Prop()
  public phone: string;

  @Prop()
  public mobile: string;
}
