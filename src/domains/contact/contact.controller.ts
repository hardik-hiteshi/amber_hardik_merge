import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateContactDto, UpdateContactDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { ContactDocument } from './schema/contact.schema';
import { ContactService } from './contact.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Contact')
export class ContactController {
  public constructor(private contactService: ContactService) {}

  @Post('contact')
  private async createContact(
    @Headers('region') region: string,
    @Body() body: CreateContactDto,
  ): Promise<object> {
    return await this.contactService.createOne(region, body);
  }

  @Put('contact/:nicename')
  private async updateContact(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
    @Body() body: UpdateContactDto,
  ): Promise<object> {
    return await this.contactService.updateOne(region, niceName, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('contact/:nicename')
  private async deleteContact(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.contactService.deleteOne(niceName, region);
  }

  @Get('contact/:nicename')
  private async getContact(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<ContactDocument> {
    return await this.contactService.findOne(niceName, region);
  }

  @Get('contacts')
  private async getAllContact(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.contactService.findAll(region, pageNumber, pageSize);
  }
}
