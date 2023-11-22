import { Alias, aliasSchema } from './schema/alias.schema';
import { AliasController } from './alias.controller';
import { AliasRepository } from './repository/alias.repository';
import { AliasService } from './alias.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Alias.name, schema: aliasSchema }]),
  ],
  controllers: [AliasController],
  providers: [AliasService, AliasRepository],
})
export class AliasModule {}
