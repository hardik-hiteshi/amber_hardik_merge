import { Author, AuthorDocument } from '../schema/author.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateAuthorDTO } from '../dto/createAuthor/createAuthor.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateAuthorDTO } from '../dto/updateAuthor/updateAuthor.dto';

@Injectable()
export class AuthorRepository {
  public constructor(
    @InjectModel(Author.name) public authorModel: Model<Author>,
  ) {}

  public async findOne(body: CreateAuthorDTO): Promise<AuthorDocument> {
    const author = await this.authorModel.findOne({ ...body });

    return author;
  }

  public async create(body: CreateAuthorDTO): Promise<AuthorDocument> {
    const author = await this.authorModel.create({
      ...body,
    });

    return author;
  }

  public async fetchAuthor(_id: ObjectId): Promise<AuthorDocument> {
    const author = await this.authorModel.findOne({
      _id,
    });

    return author;
  }

  public async updateAuthor(
    _id: ObjectId,
    body: UpdateAuthorDTO,
  ): Promise<AuthorDocument> {
    const updatedAuthor = await this.authorModel.findOneAndUpdate(
      { _id },
      body,
      { new: true },
    );

    return updatedAuthor;
  }

  public async deleteAuthor(_id: ObjectId): Promise<AuthorDocument> {
    const deletedAuthor = await this.authorModel.findOneAndDelete({ _id });

    return deletedAuthor;
  }

  public async fetchAllAuthors(
    pageNumber: number,
    pageSize: number,
  ): Promise<AuthorDocument[]> {
    const skipAmount = pageNumber * pageSize;
    const authorsList = await this.authorModel
      .find()
      .skip(skipAmount)
      .limit(pageSize);

    return authorsList;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.authorModel.countDocuments(obj);

    return docCount;
  }
}
