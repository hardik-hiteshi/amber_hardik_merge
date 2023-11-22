import { LegalTerms, LegalTermsDocument } from '../schema/legal-terms.schema';
import { CreateLegalTermsDTO } from '../dto/createLegal-terms/legal-terms.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LegalHistory } from 'src/domains/legal-history/schema/legal-history.schema';
import { Model } from 'mongoose';
import { UpdateLegalTermsDTO } from '../dto/updateLegal-terms/legal-terms.update.dto';

@Injectable()
export class LegalTermsRepository {
  public constructor(
    @InjectModel(LegalTerms.name)
    public legalTermsModel: Model<LegalTerms>,
    @InjectModel(LegalHistory.name)
    public legalHistoryModel: Model<LegalHistory>,
  ) {}

  public async createLegalTerm(
    region: string,
    body: CreateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    const legalterm = await this.legalTermsModel.create({ region, ...body });
    await this.legalHistoryModel.create({ region, ...body });

    return legalterm;
  }

  public async fetchLegalTerm(region: string): Promise<LegalTermsDocument> {
    const legalterm = await this.legalTermsModel.findOne({ region });

    return legalterm;
  }

  public async updateLegalTerm(
    region: string,
    body: UpdateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    const updatedLegalTerm = await this.legalTermsModel.findOneAndUpdate(
      { region },
      body,
      { new: true },
    );
    await this.legalHistoryModel.create({ region, ...body });

    return updatedLegalTerm;
  }

  public async deleteLegalTerm(region: string): Promise<LegalTermsDocument> {
    const deletedLegalTerm = await this.legalTermsModel.findOneAndDelete({
      region,
    });

    return deletedLegalTerm;
  }

  public async fetchLegalTerms(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<LegalTermsDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.legalTermsModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize);
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.legalTermsModel.countDocuments(obj);

    return docCount;
  }
}
