import { Contact, contactSchema } from './schema/contact.schema';
import { ContactController } from './contact.controller';
import { ContactRepository } from './repository/contact.repository';
import { ContactService } from './contact.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: contactSchema }]),
  ],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
})
export class ContactModule {}
