import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureDTO } from './dto/createfeatured.dto';
import { FeaturedDocument } from './schema/featured.schema';
import { FeaturedRepository } from './repository/featured.repository';
import { UpdateFeatureDTO } from './dto/updatefeatured.dto';

@Injectable()
export class FeaturedService {
  public constructor(public featuredRepo: FeaturedRepository) {}

  public async create(region: string, body: CreateFeatureDTO): Promise<object> {
    const newFeature = await this.featuredRepo.createOne(region, body);
    if (newFeature) {
      const response = {
        _id: newFeature._id,
      };

      return response;
    }
    throw new NotFoundException('No features found');
  }

  public async fetchFeatured(
    region: string,
    type: string,
    search?: string,
  ): Promise<FeaturedDocument> {
    const featured = await this.featuredRepo.fetchFeatured(
      region,
      type,
      search,
    );
    if (featured) {
      return featured;
    }
    throw new NotFoundException('No features found');
  }

  public async updateFeatured(
    region: string,
    body: UpdateFeatureDTO,
  ): Promise<object> {
    const updatedData = await this.featuredRepo.updateFeatured(region, body);
    if (updatedData) {
      const response = {
        _id: updatedData._id,
      };

      return response;
    }
    throw new NotFoundException('Updated data not found');
  }

  public async deleteFeatured(region: string, type: string): Promise<object> {
    const deletedData = await this.featuredRepo.deleteFeatured(type, region);

    if (deletedData) {
      return { message: 'Deleted Success' };
    }
    throw new NotFoundException('Feature Not found.');
  }

  public async fetchAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const featuredList = await this.featuredRepo.fetchAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.featuredRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: featuredList,
    };
  }
}
