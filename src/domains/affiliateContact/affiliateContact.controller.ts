import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AffiliateContactDocument } from './schema/affiliateContact.schema';
import { AffiliateContactService } from './affiliateContact.service';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAffiliateContactDTO } from './dto/createDto/createAffiliateContact.dto';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAffiliateContactDTO } from './dto/updateDto/updateAffiliateContact.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Affiliates', 'Shop')
export class AffiliateContactController {
  public constructor(
    public affiliateContactServices: AffiliateContactService,
  ) {}

  @Post('affiliatecontact')
  public async createAffiliateContact(
    @Body() body: CreateAffiliateContactDTO,
  ): Promise<object> {
    return await this.affiliateContactServices.createAffiliateContact(body);
  }

  @Get('affiliatecontact/:_id')
  public async fetchAffiliateContact(
    @Param('_id') _id: ObjectId,
  ): Promise<AffiliateContactDocument> {
    return await this.affiliateContactServices.fetchAffiliateContact(_id);
  }

  @Put('affiliatecontact/:_id')
  public async updateAffiliateContact(
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateAffiliateContactDTO,
  ): Promise<object> {
    return await this.affiliateContactServices.updateAffiliateContact(
      _id,
      body,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('affiliatecontact/:_id')
  public async deleteAffiliateContact(
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.affiliateContactServices.deleteAffiliateContact(_id);
  }

  @Get('affiliatecontacts')
  public async fetchAffiliateContacts(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.affiliateContactServices.fetchAffiliateContacts(
      pageNumber,
      pageSize,
      search,
    );
  }
}
