import { Badges, badgesSchema } from './schema/badges.schema';
import { BadgesController } from './badges.controller';
import { BadgesRespository } from './repository/badges.repository';
import { BadgesService } from './badges.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Badges.name, schema: badgesSchema }]),
  ],
  controllers: [BadgesController],
  providers: [BadgesService, BadgesRespository],
})
export class BadgesModule {}
