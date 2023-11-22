import { PostPage, postPageSchema } from './schema/post-page.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostPageController } from './post-page.controller';
import { PostPageRepository } from './repository/post-page.repository';
import { PostPageService } from './post-page.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostPage.name, schema: postPageSchema },
    ]),
  ],
  controllers: [PostPageController],
  providers: [PostPageService, PostPageRepository],
})
export class PostPageModule {}
