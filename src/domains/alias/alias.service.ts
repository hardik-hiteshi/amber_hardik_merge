import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAliasDto, UpdateAliasDto } from './dtos';
import { AliasDocument } from './schema/alias.schema';
import { AliasRepository } from './repository/alias.repository';

@Injectable()
export class AliasService {
  public aliasNotFound = ' alias not found';
  public aliasAlreadyexist = ' alias already exist';
  public constructor(private aliasRepo: AliasRepository) {}

  public async findOne(niceName: string): Promise<AliasDocument> {
    const alias = await this.aliasRepo.findOne(niceName);
    if (!alias) throw new NotFoundException(this.aliasNotFound);

    return alias;
  }

  public async findAll(pageNumber: number, pageSize: number): Promise<object> {
    const aliasList = await this.aliasRepo.findAll(pageNumber, pageSize);

    const count = await this.aliasRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: aliasList,
    };
  }

  public async createOne(body: CreateAliasDto): Promise<object> {
    const alias = await this.aliasRepo.findOne(body.niceName);
    if (alias) throw new BadRequestException(this.aliasAlreadyexist);

    const newAlias = await this.aliasRepo.createOne(body);

    const response = {
      niceName: newAlias.niceName,
    };

    return response;
  }

  public async updateOne(
    niceName: string,
    body: UpdateAliasDto,
  ): Promise<object> {
    const alias = await this.aliasRepo.updateOne(niceName, body);
    if (!alias) throw new NotFoundException(this.aliasNotFound);

    const response = {
      niceName: alias.niceName,
    };

    return response;
  }

  public async deleteOne(niceName: string): Promise<object> {
    const alias = await this.aliasRepo.deleteOne(niceName);
    if (!alias) throw new NotFoundException(this.aliasNotFound);

    return { message: 'Deleted Success' };
  }
}
