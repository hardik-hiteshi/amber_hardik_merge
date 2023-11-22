import { Category, categorySchema } from './schema/category.schema';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repository';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: categorySchema,
      },
    ]),
    RecipeModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository, MongooseModule],
})
export class CategoryModule {}
