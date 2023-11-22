import { Featured, FeaturedDocument } from '../schema/featured.schema';
import { CreateFeatureDTO } from '../dto/createfeatured.dto';
import { FeaturedQueryInterface } from './featuredquery.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFeatureDTO } from '../dto/updatefeatured.dto';

export class FeaturedRepository {
  public constructor(
    @InjectModel(Featured.name) public featuredModel: Model<Featured>,
  ) {}

  public async createOne(
    region: string,
    body: CreateFeatureDTO,
  ): Promise<FeaturedDocument> {
    const featured = await this.featuredModel.create({ ...body, region });

    return featured;
  }

  public async findOne(
    region: string,
    type: string,
  ): Promise<FeaturedDocument> {
    const existingFeatured = await this.featuredModel.findOne({
      region,
      type,
    });

    return existingFeatured;
  }

  public async fetchFeatured(
    region: string,
    type: string,
    search?: string,
  ): Promise<FeaturedDocument> {
    const query: FeaturedQueryInterface = {
      region,
      type,
    };
    if (search) {
      query.$or = [{ featuredList: { $regex: search, $options: 'i' } }];
    }
    const featured = await this.featuredModel.findOne({
      ...query,
    });

    return featured;
  }

  public async updateFeatured(
    region: string,
    body: UpdateFeatureDTO,
  ): Promise<FeaturedDocument> {
    const { type, featuredList } = body;
    const updateData: Partial<UpdateFeatureDTO> = {
      type,
    };

    if (featuredList) {
      updateData.featuredList = featuredList;
    }

    const options = {
      new: true,
      upsert: true,
    };

    const data = await this.featuredModel.findOneAndUpdate(
      { region, type },
      updateData,
      options,
    );

    if (data) {
      return data;
    }
  }

  public async deleteFeatured(
    region: string,
    type: string,
  ): Promise<FeaturedDocument> {
    return await this.featuredModel.findOneAndDelete({ type, region });
  }

  public async fetchAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<FeaturedDocument[]> {
    const skipAmount = pageNumber * pageSize;
    const featured = await this.featuredModel
      .find({
        region,
      })
      .skip(skipAmount)
      .limit(pageSize);

    return featured;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.featuredModel.countDocuments(obj);

    return docCount;
  }

  public async findAll(): Promise<FeaturedDocument[]> {
    const featured = await this.featuredModel.find();

    return featured;
  }
}
