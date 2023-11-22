import { Author, authorSchema } from './schema/author.schema';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './repository/author.repository';
import { AuthorService } from './author.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: authorSchema }]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
})
export class AuthorModule {}
