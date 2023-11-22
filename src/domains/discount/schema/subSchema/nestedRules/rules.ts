import { Prop, Schema } from '@nestjs/mongoose';
import { DateRange } from '../dateRange/dateRange';
import modelNames from '../../../../../common/elements/modelNames';
import { Schema as mongooseSchema } from 'mongoose';
import { PacksWithValue } from '../packWithValue/packWithValue';
import { PriceRange } from '../priceRange/priceRange';
import { ProductWithValue } from '../productWithValue/productWithValue';

@Schema({
  shardKey: {
    region: 1,
  },
  _id: false,
})
export class NestedRules {
  @Prop()
  public freeShipping: boolean;

  @Prop()
  public combinable: boolean;

  @Prop(DateRange)
  public dateRange: DateRange;

  @Prop(PriceRange)
  public priceRange: PriceRange;

  @Prop()
  public validUses: number;

  @Prop({ type: [mongooseSchema.Types.Mixed], ref: modelNames.Product })
  public products: mongooseSchema.Types.Mixed[];

  @Prop([ProductWithValue])
  public productsWithValue: ProductWithValue[];

  @Prop([PacksWithValue])
  public packsWithValue: PacksWithValue[];

  @Prop({ type: [mongooseSchema.Types.Mixed], ref: modelNames.Product })
  public packs: mongooseSchema.Types.Mixed[];

  @Prop({ type: [mongooseSchema.Types.Mixed], ref: modelNames.Product })
  public users: mongooseSchema.Types.Mixed[];
}
