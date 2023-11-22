import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLegalRegistryDTO } from './dto/createLegalRegistry.dto';
import { LegalRegistryDocument } from './schema/legal-registry.schema';
import { LegalRegistryRepository } from './repository/legal-registry.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class LegalRegistryService {
  public constructor(public legalRegRepo: LegalRegistryRepository) {}

  public async createLegalRegistry(
    region: string,
    body: CreateLegalRegistryDTO,
  ): Promise<object> {
    const legalRegExists = await this.legalRegRepo.findOne(region, body);
    if (legalRegExists) {
      throw new BadRequestException('LegalRegistry Document already exists.');
    }
    const newlegalRegDoc = await this.legalRegRepo.create(region, body);
    const response = {
      _id: newlegalRegDoc._id,
    };

    return response;
  }

  public async fetchLegalRegistry(
    region: string,
    _id: ObjectId,
  ): Promise<LegalRegistryDocument> {
    const legalRegDoc = await this.legalRegRepo.fetchOne(region, _id);
    if (!legalRegDoc) {
      throw new NotFoundException('LegalRegistry Document not found.');
    }

    return legalRegDoc;
  }

  public async fetchAllLegalRegistry(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const legalRegDocList = await this.legalRegRepo.fetchAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.legalRegRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: legalRegDocList,
    };
  }
}
