import {
  ReturnedProducts,
  returnedProductsSchema,
} from './schema/returned-products.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnedProductsController } from './returned-products.controller';
import { ReturnedProductsRepository } from './repository/returned-products.repository';
import { ReturnedProductsService } from './returned-products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReturnedProducts.name, schema: returnedProductsSchema },
    ]),
  ],
  controllers: [ReturnedProductsController],
  providers: [ReturnedProductsService, ReturnedProductsRepository],
})
export class ReturnedProductsModule {}
