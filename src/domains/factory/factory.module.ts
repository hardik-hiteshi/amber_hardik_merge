import { Factory, factorySchema } from './schema/factory.schema';
import { FactoryController } from './factory.controller';
import { FactoryRepository } from './repository/factory.repository';
import { FactoryService } from './factory.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Factory.name, schema: factorySchema }]),
    FactoryModule,
  ],
  controllers: [FactoryController],
  providers: [FactoryService, FactoryRepository],
})
export class FactoryModule {}
