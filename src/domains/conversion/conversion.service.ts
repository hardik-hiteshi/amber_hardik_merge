import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConversionDocument } from './schema/conversion.schema';
import { ConversionRepository } from './repository/conversion.repository';
import { CreateConversionDTO } from './dto/createDto/create.conversion.dto';
import { ObjectId } from 'mongoose';
import { UpdateConversionDTO } from './dto/updateDto/update.conversion.dto';

@Injectable()
export class ConversionService {
  public constructor(public conversionsRepo: ConversionRepository) {}

  public async createConversion(body: CreateConversionDTO): Promise<object> {
    const newConversion = await this.conversionsRepo.createConversion(body);
    const response = {
      _id: newConversion._id,
    };

    return response;
  }

  public async fetchConversion(_id: ObjectId): Promise<ConversionDocument> {
    const conversions = await this.conversionsRepo.fetchOne(_id);
    if (!conversions) {
      throw new NotFoundException('Conversion not found.');
    }

    return conversions;
  }

  public async updateConversion(
    _id: ObjectId,
    body: UpdateConversionDTO,
  ): Promise<object> {
    let updatedConversion: ConversionDocument;
    try {
      updatedConversion = await this.conversionsRepo.updateConversion(
        _id,
        body,
      );
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedConversion) {
      throw new NotFoundException('conversion Not found.');
    }

    const response = {
      _id: updatedConversion._id,
    };

    return response;
  }

  public async deleteConversion(_id: ObjectId): Promise<object> {
    const deletedConversion = await this.conversionsRepo.deleteConversion(_id);

    if (!deletedConversion) {
      throw new NotFoundException('conversion Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchConversions(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const conversionList = await this.conversionsRepo.fetchConversions(
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.conversionsRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: conversionList,
    };
  }
}
