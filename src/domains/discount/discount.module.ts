import { Discount, discountSchema } from './schema/discount.schema';
import { DiscountController } from './discount.controller';
import { DiscountRepository } from './repository/discount.repository';
import { DiscountService } from './discount.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: discountSchema },
    ]),
  ],
  controllers: [DiscountController],
  providers: [DiscountService, DiscountRepository],
})
export class DiscountModule {}
