/* eslint-disable @typescript-eslint/naming-convention */
import { GeoLocation, GeoLocationDocument } from '../schema/geoLocation.schema';
import { CreateGeoLocationDTO } from '../dto/createDto/createGeoLocation.dto';
// import { GeoLocationQueryInterface } from './geoLocation.query.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UpdateGeoLocationDTO } from '../dto/updateDto/updateGeoLocation.dto';
@Injectable()
export class GeoLocationRepository {
  public constructor(
    @InjectModel(GeoLocation.name)
    public geoLocationModel: Model<GeoLocationDocument>,
  ) {}

  public async findOne(
    region: string,
    network_last_ip: number,
    network_start_ip: number,
  ): Promise<GeoLocationDocument> {
    const existingGeoLocation = await this.geoLocationModel.findOne({
      region,
      network_last_ip,
      network_start_ip,
    });

    return existingGeoLocation;
  }

  public async createGeoLocation(
    region: string,
    body: CreateGeoLocationDTO,
  ): Promise<GeoLocationDocument> {
    const geoLocation = await this.geoLocationModel.create({ ...body, region });

    return geoLocation;
  }

  public async fetchGeoLocation(query: object): Promise<GeoLocationDocument> {
    const geoLocation = await this.geoLocationModel.findOne(query);

    return geoLocation;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.geoLocationModel.countDocuments(obj);

    return docCount;
  }

  // public async countDocs(obj: object): Promise<number> {
  //   const docCount = await this.geoLocationModel.countDocuments(obj);

  //   return docCount;
  // }

  // public async updateGeoLocation(
  //   region: string,
  //   niceName: string,
  //   body: UpdateGeoLocationDTO,
  // ): Promise<GeoLocationDocument> {
  //   const updatedGeoLocation = await this.geoLocationModel.findOneAndUpdate(
  //     { region, niceName, },
  //     body,
  //     { new: true },
  //   );

  //   return updatedGeoLocation;
  // }

  // public async deleteGeoLocation(
  //   region: string,
  //   niceName: string,
  // ): Promise<GeoLocationDocument> {
  //   const deletedGeoLocation = await this.geoLocationModel.findOneAndDelete(
  //     { region, niceName,  },
  //   );

  //   return deletedGeoLocation;
  // }

  // public async fetchGeoLocations(
  //   region: string,
  //   pageNumber: number,
  //   pageSize: number,

  //   search?: string,
  // ): Promise<GeoLocationDocument[]> {
  //   const query: GeoLocationQueryInterface = {
  //     region,
  //   };
  //   const skipAmount = pageNumber * pageSize;
  //   if (search) {
  //     query.$or = [
  //       { name: { $regex: search.toString(), $options: 'i' } },
  //       { niceName: { $regex: search.toString(), $options: 'i' } },
  //       { description: { $regex: search.toString(), $options: 'i' } },
  //       { region: { $regex: search.toString(), $options: 'i' } },
  //       //will work on this later.
  //       // {
  //       //   'translations.from.region': {
  //       //     $regex: search.toString(),
  //       //     $options: 'i',
  //       //   },
  //       // },
  //       // {
  //       //   'translations.from.niceName': {
  //       //     $regex: search.toString(),
  //       //     $options: 'i',
  //       //   },
  //       // },
  //     ];
  //   }

  //   const geoLocations = await this.geoLocationModel
  //     .find({
  //       $and: [query],
  //     })
  //     .skip(skipAmount)
  //     .limit(pageSize);

  //   return geoLocations;
  // }
}
