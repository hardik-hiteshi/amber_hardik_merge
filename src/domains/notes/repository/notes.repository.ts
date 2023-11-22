import { Model, Types } from 'mongoose';
import { Notes, NotesDocument } from '../schema/notes.schema';
import { CreateNotesDTO } from '../dto/notes.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateNotesDTO } from '../dto/notes.update.dto';
import { User } from 'src/domains/user/schema/user.schema';

@Injectable()
export class NotesRepository {
  public constructor(
    @InjectModel(Notes.name) public notesModel: Model<Notes>,
    // @InjectModel(Recipe.name) public recipeModel: Model<Recipe>,
    @InjectModel(User.name) public userModel: Model<User>,
  ) {}

  public async findOne(
    region: string,
    body: CreateNotesDTO,
  ): Promise<NotesDocument> {
    const notes = await this.notesModel.findOne({
      region,
      ...body,
    });

    return notes;
  }

  public async createNote(
    region: string,
    body: CreateNotesDTO,
  ): Promise<NotesDocument> {
    const notes = await this.notesModel.create({
      region,
      ...body,
    });

    return notes;
  }

  public async fetchNote(
    region: string,
    recipe: string,
  ): Promise<NotesDocument> {
    const note = await this.notesModel.findOne({
      region,
      recipe,
    });

    return note;
  }

  public async updateNote(
    region: string,
    recipe: string,
    body: UpdateNotesDTO,
  ): Promise<NotesDocument> {
    const updatedNote = await this.notesModel.findOneAndUpdate(
      { region, recipe },
      body,
      { new: true },
    );

    return updatedNote;
  }

  public async deleteNote(
    region: string,
    recipe: string,
  ): Promise<NotesDocument> {
    const deletedNote = await this.notesModel.findOneAndDelete({
      region,
      recipe,
    });

    return deletedNote;
  }

  public async fetchNotes(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<NotesDocument[]> {
    const skipAmount = pageNumber * pageSize;
    const notesList = await this.notesModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize);

    return notesList;
  }

  public async fetchNoteRecipe(
    region: string,
    recipe: string,
  ): Promise<NotesDocument> {
    const notes = (await this.notesModel
      .find({
        region,
      })
      .populate('recipe niceName -_id')) as Array<
      NotesDocument & {
        recipe: { niceName: string };
      }
    >;

    const result = notes.find((note) => note?.recipe?.niceName === recipe);

    return result;
  }

  public async fetchRecipeNotesRecipe(
    user: Types.ObjectId,
    region: string,
    recipe: Types.ObjectId,
  ): Promise<NotesDocument> {
    const notes = await this.notesModel.findOne({
      region,
      user,
      recipe,
    });

    return notes;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.notesModel.countDocuments(obj);

    return docCount;
  }
}
