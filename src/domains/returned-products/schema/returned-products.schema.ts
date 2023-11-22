/* eslint-disable no-duplicate-imports */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HistoryState } from './subSchema/historyState/historyState';
import { HydratedDocument } from 'mongoose';
import { Line } from './subSchema/line/line';
import modelNames from '../../../common/elements/modelNames';
import { Schema as mongooseSchema } from 'mongoose';
import { ShippingAddress } from './subSchema/shippingAddress/shippingAddress';

export type ReturnedProductsDocument = HydratedDocument<ReturnedProducts>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class ReturnedProducts {
  @Prop()
  public orderId: string;

  @Prop()
  public validationMail: string;

  @Prop({ required: true, default: Date.now })
  public date: Date;

  @Prop([Line])
  public products: Line[];

  @Prop({
    required: true,
    default: 'Requested',
    enum: [
      'Requested',
      'Accepted',
      'Rejected',
      'Solved',
      'Pre-accepted',
      'Received',
      'Approved',
    ],
    validate: {
      validator(v: string): boolean {
        if (v === 'Accepted' && !this.sapReturnNumber) {
          return false;
        }

        return true;
      },
    },
  })
  public state: string;

  @Prop({ type: mongooseSchema.Types.Mixed, ref: modelNames.User })
  public customer: mongooseSchema.Types.Mixed;

  @Prop({ type: mongooseSchema.Types.Mixed })
  public customerValue: mongooseSchema.Types.Mixed;

  @Prop()
  public sapReturnNumber: string;

  @Prop()
  public carrierLink: string;

  @Prop({ required: true })
  public returnReason: string;

  @Prop()
  public comments: string;

  @Prop(ShippingAddress)
  public shippingAddress: ShippingAddress;

  @Prop([HistoryState])
  public historyState: HistoryState;
}

export const returnedProductsSchema =
  SchemaFactory.createForClass(ReturnedProducts);
