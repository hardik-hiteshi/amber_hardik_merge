import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto, UpdateContactDto } from './dtos';
import { ContactDocument } from './schema/contact.schema';
import { ContactRepository } from './repository/contact.repository';

@Injectable()
export class ContactService {
  public contactNotFound = 'contact not found';
  public contactAlreadyExist = 'contact already exist';
  public constructor(private contactRepo: ContactRepository) {}

  public async createOne(
    region: string,
    body: CreateContactDto,
  ): Promise<object> {
    const contact = await this.contactRepo.findOne(body.niceName, region);

    if (contact) {
      throw new BadRequestException(this.contactAlreadyExist);
    }

    const newContact = await this.contactRepo.createOne(region, body);
    const response = {
      niceName: newContact.niceName,
    };

    return response;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<ContactDocument> {
    const contact = await this.contactRepo.findOne(niceName, region);
    if (!contact) throw new NotFoundException(this.contactNotFound);

    return contact;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const contactList = await this.contactRepo.findAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.contactRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: contactList,
    };
  }

  public async updateOne(
    region: string,
    niceName: string,
    body: UpdateContactDto,
  ): Promise<object> {
    const contact = await this.contactRepo.updateOne(niceName, region, body);
    if (!contact) throw new NotFoundException(this.contactNotFound);
    const response = {
      niceName: contact.niceName,
    };

    return response;
  }

  public async deleteOne(niceName: string, region: string): Promise<object> {
    const contact = await this.contactRepo.deleteOne(niceName, region);
    if (!contact) throw new NotFoundException(this.contactNotFound);

    return { message: 'Deleted Success' };
  }
}
