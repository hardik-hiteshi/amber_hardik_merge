import { Notes, notesSchema } from './schema/notes.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller';
import { NotesRepository } from './repository/notes.repository';
import { NotesService } from './notes.service';
import { RecipeModule } from '../recipe/recipe.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: notesSchema }]),
    RecipeModule,
    UserModule,
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
  exports: [MongooseModule],
})
export class NotesModule {}
