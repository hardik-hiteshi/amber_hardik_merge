import {
  PostCategory,
  postCategorySchema,
} from './schema/post-category.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostCategoryController } from './post-category.controller';
import { PostCategoryRepository } from './repository/post-category.repository';
import { PostCategoryService } from './post-category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostCategory.name, schema: postCategorySchema },
    ]),
  ],
  controllers: [PostCategoryController],
  providers: [PostCategoryService, PostCategoryRepository],
})
export class PostCategoryModule {}
