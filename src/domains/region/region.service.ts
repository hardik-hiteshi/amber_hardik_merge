import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContextFields } from './schema/subSchema/contextFields.subSchema';
import { CreateManyRegionDto } from './dto/createManyRegion/createManyRegion.dto';
import { CreateRegionDTO } from './dto/createDTO/createRegion.dto';
import { RegionDocument } from './schema/region.schema';
import { RegionRepository } from './repository/region.repository';
import { UpdateRegionDTO } from './dto/updateDTO/updateregion.dto';

@Injectable()
export class RegionService {
  public regionNotFound = 'Region not found';
  public regionAlreadyExist = 'Region already exist';
  public constructor(private regionRepo: RegionRepository) {}

  public async findOne(niceName: string): Promise<RegionDocument> {
    const regionData = await this.regionRepo.findOne(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async findAll(pageNumber: number, pageSize: number): Promise<object> {
    const regionsList = await this.regionRepo.findAll(pageNumber, pageSize);

    const count = await this.regionRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: regionsList,
    };
  }

  public async createOne(body: CreateRegionDTO): Promise<object> {
    const regionData = await this.regionRepo.findOne(body.niceName);

    if (regionData) {
      throw new BadRequestException(this.regionAlreadyExist);
    }

    const newData = await this.regionRepo.createOne(body);
    const response = {
      niceName: newData.niceName,
    };

    return response;
  }

  public async updateOne(
    niceName: string,
    body: UpdateRegionDTO,
  ): Promise<object> {
    const regionData = await this.regionRepo.updateOne(niceName, body);
    if (!regionData) throw new NotFoundException(this.regionNotFound);
    const response = {
      niceName: regionData.niceName,
    };

    return response;
  }

  public async deleteOne(niceName: string): Promise<object> {
    const regionData = await this.regionRepo.deleteOne(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return { message: 'Deleted Success' };
  }

  public async findOneAdminUser(
    niceName: string,
  ): Promise<Partial<RegionDocument>> {
    const regionData = await this.regionRepo.findOneAdminUser(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async findOneContextFields(
    niceName: string,
  ): Promise<Partial<RegionDocument>> {
    const regionData = await this.regionRepo.findOneContextFields(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async findOneContextFieldsByIndex(
    niceName: string,
    index: number,
  ): Promise<ContextFields> {
    const regionData = await this.regionRepo.findOneContextFieldsByIndex(
      niceName,
      index,
    );
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async createMany(body: CreateManyRegionDto): Promise<{
    insertedDocuments: RegionDocument[];
    skippedDocuments: RegionDocument[];
  }> {
    const insertedDocuments: RegionDocument[] = [];
    const skippedDocuments: RegionDocument[] = [];

    for (const doc of body.data) {
      const regionData = await this.regionRepo.findOne(doc.niceName);
      if (regionData) {
        skippedDocuments.push(regionData);
      } else {
        const result = await this.regionRepo.createOne(doc);

        insertedDocuments.push(result);
      }
    }

    const finalData = {
      insertedDocuments,
      skippedDocuments,
    };

    return finalData;
  }

  public async findAllAdminUser(niceName: string): Promise<RegionDocument> {
    const regionData = await this.regionRepo.findAllAdminUser(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }
}
