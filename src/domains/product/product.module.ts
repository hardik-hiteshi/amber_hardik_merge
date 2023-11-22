import { Product, productSchema } from './schema/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
