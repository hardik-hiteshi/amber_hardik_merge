import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNutritionalDisclaimerDTO } from './dto/createNutritionalDisclaimer/createNutritionalDisclaimer.dto';
import { NutritionalDisclaimerDocument } from './schema/nutritionalDisclaimer.schema';
import { NutritionalDisclaimerRepository } from './repository/nutritionalDisclaimer.repository';
import { UpdateNutritionalDisclaimerDTO } from './dto/updateNutritionalDisclaimer/updateNutritionalDisclaimer.dto';

@Injectable()
export class NutritionalDisclaimerService {
  public constructor(public ndRepo: NutritionalDisclaimerRepository) {}

  public async createNutritionalDisclaimer(
    region: string,
    body: CreateNutritionalDisclaimerDTO,
  ): Promise<object> {
    const ndDoc = await this.ndRepo.findOne(region, body);
    if (ndDoc) {
      throw new BadRequestException('Nutritional Disclaimer already exists.');
    }
    const newData = await this.ndRepo.create(region, body);
    const response = {
      niceName: newData.niceName,
    };

    return response;
  }

  public async fetchNutritionalDisclaimer(
    region: string,
  ): Promise<NutritionalDisclaimerDocument> {
    const ndDoc = await this.ndRepo.fetchND(region);
    if (ndDoc) {
      return ndDoc;
    }
    throw new NotFoundException('NutritionalDisclaimer not found.');
  }

  public async fetchAllNutritionalDisclaimer(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const ndDocList = await this.ndRepo.fetchAllND(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.ndRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: ndDocList,
    };
  }

  public async upsertNutritionalDisclaimer(
    region: string,
    body: UpdateNutritionalDisclaimerDTO,
  ): Promise<object> {
    const updatedNDdoc = await this.ndRepo.upsertND(region, body);
    if (!updatedNDdoc) {
      throw new NotFoundException(
        'Nutritional Disclaimer to update not found.',
      );
    }
    const response = {
      niceName: updatedNDdoc.niceName,
    };

    return response;
  }

  public async deleteNutritionalDisclaimer(region: string): Promise<object> {
    const deletedNDdoc = await this.ndRepo.deleteND(region);
    if (!deletedNDdoc) {
      throw new NotFoundException(
        'Nutritional Disclaimer to update not found.',
      );
    }

    return { message: 'Deleted Success' };
  }
}
