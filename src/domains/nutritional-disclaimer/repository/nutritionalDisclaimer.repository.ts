import {
  NutritionalDisclaimer,
  NutritionalDisclaimerDocument,
} from '../schema/nutritionalDisclaimer.schema';
import { CreateNutritionalDisclaimerDTO } from '../dto/createNutritionalDisclaimer/createNutritionalDisclaimer.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateNutritionalDisclaimerDTO } from '../dto/updateNutritionalDisclaimer/updateNutritionalDisclaimer.dto';

@Injectable()
export class NutritionalDisclaimerRepository {
  public constructor(
    @InjectModel(NutritionalDisclaimer.name)
    public ndModel: Model<NutritionalDisclaimer>,
  ) {}

  public async findOne(
    region: string,
    body: CreateNutritionalDisclaimerDTO,
  ): Promise<NutritionalDisclaimerDocument> {
    const existingndDoc = await this.ndModel.findOne({
      region,
      ...body,
    });

    return existingndDoc;
  }

  public async create(
    region: string,
    body: CreateNutritionalDisclaimerDTO,
  ): Promise<NutritionalDisclaimerDocument> {
    const createdndDoc = await this.ndModel.create({
      region,
      ...body,
    });

    return createdndDoc;
  }

  public async fetchND(region: string): Promise<NutritionalDisclaimerDocument> {
    const ndDoc = await this.ndModel.findOne({ region });

    return ndDoc;
  }

  public async fetchAllND(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<NutritionalDisclaimerDocument[]> {
    const skipAmount = pageNumber * pageSize;
    const ndDocList = await this.ndModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize);

    return ndDocList;
  }

  public async upsertND(
    region: string,
    body: UpdateNutritionalDisclaimerDTO,
  ): Promise<NutritionalDisclaimerDocument> {
    const options = {
      new: true,
      upsert: true,
    };
    const updatedNDdoc = await this.ndModel.findOneAndUpdate(
      { region },
      body,
      options,
    );

    return updatedNDdoc;
  }

  public async deleteND(
    region: string,
  ): Promise<NutritionalDisclaimerDocument> {
    const deletedNDdoc = await this.ndModel.findOneAndDelete({ region });

    return deletedNDdoc;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.ndModel.countDocuments(obj);

    return docCount;
  }
}
