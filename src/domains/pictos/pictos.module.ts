import { Pictos, pictosSchema } from './schema/pictos.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PictosController } from './pictos.controller';
import { PictosRepository } from './repository/pictos.repository';
import { PictosService } from './pictos.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pictos.name, schema: pictosSchema }]),
  ],
  controllers: [PictosController],
  providers: [PictosService, PictosRepository],
})
export class PictosModule {}
