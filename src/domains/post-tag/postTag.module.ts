import { PostTag, postTagSchema } from './schema/postTag.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostTagController } from './postTag.controller';
import { PostTagRepository } from './repository/postTag.repository';
import { PostTagService } from './postTag.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostTag.name, schema: postTagSchema }]),
  ],
  controllers: [PostTagController],
  providers: [PostTagService, PostTagRepository],
})
export class PostTagModule {}
