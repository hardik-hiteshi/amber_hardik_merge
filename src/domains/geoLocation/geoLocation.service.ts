/* eslint-disable @typescript-eslint/naming-convention */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGeoLocationDTO } from './dto/createDto/createGeoLocation.dto';
import { GeoLocationDocument } from './schema/geoLocation.schema';
import { GeoLocationRepository } from './repository/geoLocation.repository';
// import { UpdateGeoLocationDTO } from './dto/updateDto/updateGeoLocation.dto';

@Injectable()
export class GeoLocationService {
  public constructor(public geoLocationRepo: GeoLocationRepository) {}

  public async createGeoLocation(
    region: string,
    body: CreateGeoLocationDTO,
  ): Promise<GeoLocationDocument> {
    const geoLocation = await this.geoLocationRepo.findOne(
      region,
      body.network_last_ip,
      body.network_start_ip,
    );
    if (!geoLocation) {
      const geoLocation = await this.geoLocationRepo.createGeoLocation(
        region,
        body,
      );

      return geoLocation;
    }
    throw new BadRequestException('GeoLocation Already exists.');
  }

  public async fetchGeoLocation(
    region: string,
    network_start_ip: number,
    network_last_ip: number,
  ): Promise<GeoLocationDocument> {
    const query = {
      region,
      network_start_ip,
      network_last_ip,
    };
    const geoLocation = await this.geoLocationRepo.fetchGeoLocation(query);
    if (!geoLocation) {
      throw new NotFoundException('GeoLocation not found.');
    }

    return geoLocation;
  }

  public async getGeoLocation(query: object): Promise<GeoLocationDocument> {
    const geoLocation = await this.geoLocationRepo.fetchGeoLocation(query);

    return geoLocation;
  }

  // public async updateGeoLocation(
  //   region: string,
  //   niceName: string,
  //   body: UpdateGeoLocationDTO,
  // ): Promise<GeoLocationDocument> {
  //   const updatedGeoLocation = await this.geoLocationRepo.updateGeoLocation(
  //     region,
  //     niceName,
  //     body,
  //   );
  //   if (!updatedGeoLocation) {
  //     throw new NotFoundException('GeoLocation Not found.');
  //   }

  //   return updatedGeoLocation;
  // }

  // public async deleteGeoLocation(
  //   region: string,
  //   niceName: string,
  // ): Promise<object> {
  //   const deletedGeoLocation = await this.geoLocationRepo.deleteGeoLocation(
  //     region,
  //     niceName,
  //   );
  //   if (!deletedGeoLocation) {
  //     throw new NotFoundException('GeoLocation Not found.');
  //   }

  //   return { message: 'Deleted Success' };
  // }

  // public async fetchGeoLocations(
  //   region: string,
  //   pageNumber: number,
  //   pageSize: number,
  //   search?: string,
  // ): Promise<object> {
  //   const geoLocationsList = await this.geoLocationRepo.fetchGeoLocations(
  //     region,
  //     pageNumber,
  //     pageSize,
  //     search,
  //   );
  //   const count = await this.geoLocationRepo.countDocs({ region });

  //   return {
  //     status: {
  //       count,
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       search_count: count,
  //     },
  //     result: geoLocationsList,
  //   };
  // }
}
