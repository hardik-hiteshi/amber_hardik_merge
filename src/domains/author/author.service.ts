import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorDocument } from './schema/author.schema';
import { AuthorRepository } from './repository/author.repository';
import { CreateAuthorDTO } from './dto/createAuthor/createAuthor.dto';
import { ObjectId } from 'mongoose';
import { UpdateAuthorDTO } from './dto/updateAuthor/updateAuthor.dto';

@Injectable()
export class AuthorService {
  public constructor(public authorRepo: AuthorRepository) {}

  public async createAuthor(body: CreateAuthorDTO): Promise<object> {
    const authorExists = await this.authorRepo.findOne(body);

    if (authorExists) {
      throw new BadRequestException('Author already exists.');
    }

    const newAuthor = await this.authorRepo.create(body);
    const response = {
      _id: newAuthor._id,
    };

    return response;
  }

  public async fetchAuthor(_id: ObjectId): Promise<AuthorDocument> {
    const author = await this.authorRepo.fetchAuthor(_id);
    if (!author) {
      throw new NotFoundException('Author Not found.');
    }

    return author;
  }

  public async updateAuthor(
    _id: ObjectId,
    body: UpdateAuthorDTO,
  ): Promise<object> {
    const updatedAuthor = await this.authorRepo.updateAuthor(_id, body);
    if (!updatedAuthor) {
      throw new NotFoundException(' Updated Author not found.');
    }

    const response = {
      _id: updatedAuthor._id,
    };

    return response;
  }

  public async deleteAuthor(_id: ObjectId): Promise<object> {
    const deletedAuthor = await this.authorRepo.deleteAuthor(_id);
    if (!deletedAuthor) {
      throw new NotFoundException('No Author found to delete.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAllAuthors(
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const authorsList = await this.authorRepo.fetchAllAuthors(
      pageNumber,
      pageSize,
    );

    const count = await this.authorRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: authorsList,
    };
  }
}
