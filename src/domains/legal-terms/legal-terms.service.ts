import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLegalTermsDTO } from './dto/createLegal-terms/legal-terms.create.dto';
import { LegalTermsDocument } from './schema/legal-terms.schema';
import { LegalTermsRepository } from './repository/legal-terms.repository';
import { UpdateLegalTermsDTO } from './dto/updateLegal-terms/legal-terms.update.dto';

@Injectable()
export class LegalTermsService {
  public constructor(public legalRepo: LegalTermsRepository) {}

  public async createLegalTerm(
    region: string,
    body: CreateLegalTermsDTO,
  ): Promise<object> {
    const legaltermExists = await this.legalRepo.fetchLegalTerm(region);
    if (legaltermExists) {
      throw new BadRequestException('LegalTerm alredy exists.');
    }
    const legalterm = await this.legalRepo.createLegalTerm(region, body);
    const response = {
      region: legalterm.region,
    };

    return response;
  }

  public async fetchLegalTerm(region: string): Promise<LegalTermsDocument> {
    const legalterm = await this.legalRepo.fetchLegalTerm(region);
    if (!legalterm) {
      throw new NotFoundException('No Legal Term found.');
    }

    return legalterm;
  }

  public async updateLegalTerm(
    region: string,
    body: UpdateLegalTermsDTO,
  ): Promise<object> {
    const updatedLegalTerm = await this.legalRepo.updateLegalTerm(region, body);
    if (!updatedLegalTerm) {
      throw new NotFoundException('No Updated document found.');
    }

    const response = {
      region: updatedLegalTerm.region,
    };

    return response;
  }

  public async deleteLegalTerm(region: string): Promise<object> {
    const deletedLegalTerm = await this.legalRepo.deleteLegalTerm(region);
    if (!deletedLegalTerm) {
      throw new NotFoundException('No Deleted document found.');
    }

    return { message: 'Delete Success' };
  }

  public async fetchLegalTerms(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const legalTermsList = await this.legalRepo.fetchLegalTerms(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.legalRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: legalTermsList,
    };
  }
}
