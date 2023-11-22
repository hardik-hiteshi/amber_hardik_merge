import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotesDTO } from './dto/notes.create.dto';
import { NotesDocument } from './schema/notes.schema';
import { NotesRepository } from './repository/notes.repository';
import { RecipeRepository } from '../recipe/repository/recipe.repository';
import { UpdateNotesDTO } from './dto/notes.update.dto';
import { UserDocument } from '../user/schema/user.schema';

@Injectable()
export class NotesService {
  public constructor(
    public notesRepo: NotesRepository,
    public recipeRepo: RecipeRepository,
  ) {}

  public async createNote(
    region: string,
    body: CreateNotesDTO,
  ): Promise<object> {
    const notesExists = await this.notesRepo.findOne(region, body);
    if (notesExists) {
      throw new BadRequestException('Note already exists.');
    }

    const notes = await this.notesRepo.createNote(region, body);
    const response = {
      recipe: notes.recipe,
    };

    return response;
  }

  public async fetchNote(
    region: string,
    recipe: string,
    // type: string,
  ): Promise<NotesDocument> {
    const note = await this.notesRepo.fetchNote(region, recipe);
    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return note;
  }

  public async updateNote(
    region: string,
    recipe: string,
    body: UpdateNotesDTO,
  ): Promise<object> {
    const updatedNote = await this.notesRepo.updateNote(region, recipe, body);
    if (!updatedNote) {
      throw new NotFoundException('Note not updated.Note not found.');
    }

    const response = {
      recipe: updatedNote.recipe,
    };

    return response;
  }

  public async deleteNote(region: string, recipe: string): Promise<object> {
    const deletedNote = await this.notesRepo.deleteNote(region, recipe);
    if (!deletedNote) {
      throw new NotFoundException('Note not  deleted. object not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchNotes(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const notesList = await this.notesRepo.fetchNotes(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.notesRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: notesList,
    };
  }

  public async fetchNoteRecipe(
    region: string,
    recipe: string,
  ): Promise<NotesDocument> {
    const note = await this.notesRepo.fetchNoteRecipe(region, recipe);
    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return note;
  }

  public async fetchRecipeNotesRecipe(
    user: UserDocument,
    region: string,
    recipe: string,
  ): Promise<NotesDocument> {
    const recipeData = await this.recipeRepo.fetchOne(region, recipe);
    if (!recipeData) {
      throw new NotFoundException('Recipe not found.');
    }
    const note = await this.notesRepo.fetchRecipeNotesRecipe(
      user._id,
      region,
      recipeData._id,
    );
    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return note;
  }

  // public async insertRecipeNotesRecipe(
  //   user: UserDocument,
  //   region: string,
  //   recipe: string,
  //   body: UpdateNotesDTO,
  // ): Promise<NotesDocument> {
  //   const recipeData: RecipeDocument = await this.recipeRepo.fetchOne(
  //     region,
  //     recipe,
  //   );
  //   if (!recipeData) {
  //     throw new NotFoundException('Recipe not found.');
  //   }

  //   if (recipeData) {
  //     let existsStep = false;

  //     if (recipeData.groups) {
  //       for (const group of recipeData.groups) {
  //         if (group.steps && !existsStep) {
  //           existsStep = group.steps.find(
  //             (s: HydratedDocument<Steps>) => s._id == body.id,
  //           )
  //             ? true
  //             : false;
  //         }
  //       }
  //     }

  //     if (existsStep) {
  //       let notes = await this.notesRepo.fetchRecipeNotesRecipe(
  //         user._id,
  //         region,
  //         recipeData._id,
  //       );

  //       if (!notes) {
  //         notes = await this.notesRepo.createNote(region, {
  //           user: user._id,
  //           recipe: recipeData._id,
  //           steps: {},
  //         });
  //       }

  //       const noteData = (notes.steps[body.id] = { note: body.note });
  //       const result = await this.notesRepo.updateNote(
  //         region,
  //         notes._id,
  //         noteData,
  //       );

  //       notes.markModified('steps');
  //       await notes.save();

  //       return notes.steps;
  //     }
  //     throw new NotFoundException('Step not found.');
  //   }

  //   // const note = await this.notesRepo.fetchRecipeNotesRecipe(
  //   //   user._id,
  //   //   region,
  //   //   recipeData._id,
  //   // );

  // //  return note;
  // }
}
