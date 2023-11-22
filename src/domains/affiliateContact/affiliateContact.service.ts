import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AffiliateContactDocument } from './schema/affiliateContact.schema';
import { AffiliateContactRepository } from './repository/affiliateContact.repository';
import { CreateAffiliateContactDTO } from './dto/createDto/createAffiliateContact.dto';
import { ObjectId } from 'mongoose';
import { UpdateAffiliateContactDTO } from './dto/updateDto/updateAffiliateContact.dto';

@Injectable()
export class AffiliateContactService {
  public constructor(public affiliateContactRepo: AffiliateContactRepository) {}

  public async createAffiliateContact(
    body: CreateAffiliateContactDTO,
  ): Promise<object> {
    const newAffiliateContact =
      await this.affiliateContactRepo.createAffiliateContact(body);

    const response = {
      _id: newAffiliateContact._id,
    };

    return response;
  }

  public async fetchAffiliateContact(
    _id: ObjectId,
  ): Promise<AffiliateContactDocument> {
    const affiliateContact = await this.affiliateContactRepo.fetchOne(_id);
    if (!affiliateContact) {
      throw new NotFoundException('Affiliate-Contact not found.');
    }

    return affiliateContact;
  }

  public async updateAffiliateContact(
    _id: ObjectId,
    body: UpdateAffiliateContactDTO,
  ): Promise<object> {
    let updatedAffiliateContact: AffiliateContactDocument;
    try {
      updatedAffiliateContact =
        await this.affiliateContactRepo.updateAffiliateContact(_id, body);
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedAffiliateContact) {
      throw new NotFoundException('Affiliate-Contact Not found.');
    }
    const response = {
      _id: updatedAffiliateContact._id,
    };

    return response;
  }

  public async deleteAffiliateContact(_id: ObjectId): Promise<object> {
    const deletedAffiliateContact =
      await this.affiliateContactRepo.deleteAffiliateContact(_id);

    if (!deletedAffiliateContact) {
      throw new NotFoundException('Affiliate-Contact Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAffiliateContacts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const affiliateContactsList =
      await this.affiliateContactRepo.fetchAffiliateContacts(
        pageNumber,
        pageSize,
        search,
      );

    const count = await this.affiliateContactRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: affiliateContactsList,
    };
  }
}
