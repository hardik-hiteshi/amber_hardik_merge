import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateNotesDTO } from './dto/notes.create.dto';
import { GET_USER } from '../auth/decorator';
import { NotesDocument } from './schema/notes.schema';
import { NotesService } from './notes.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateNotesDTO } from './dto/notes.update.dto';
import { UserDocument } from '../user/schema/user.schema';

@AUTH(Role.admin)
@Controller()
@ApiTags('Notes')
export class NotesController {
  public constructor(public noteServices: NotesService) {}

  @Post('note')
  public async createNote(
    @Headers('region') region: string,
    @Body() body: CreateNotesDTO,
  ): Promise<object> {
    return await this.noteServices.createNote(region, body);
  }

  @Get('note/:recipe')
  public async fetchNote(
    // @Query('type') type: string,
    @Headers('region') region: string,
    @Param('recipe') recipe: string,
  ): Promise<NotesDocument> {
    // return await this.noteServices.fetchNote(region, recipe, type);
    return await this.noteServices.fetchNote(region, recipe);
  }

  @Put('note/:recipe')
  public async updateNote(
    @Headers('region') region: string,
    @Param('recipe') recipe: string,
    @Body() body: UpdateNotesDTO,
  ): Promise<object> {
    return await this.noteServices.updateNote(region, recipe, body);
  }

  @Delete('note/:recipe')
  public async deleteNote(
    @Headers('region') region: string,
    @Param('recipe') recipe: string,
  ): Promise<void> {
    await this.noteServices.deleteNote(region, recipe);
  }

  @Get('notes')
  public async fetchNotes(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.noteServices.fetchNotes(region, pageNumber, pageSize);
  }

  @Get('note/:recipe/recipe')
  public async fetchNoteRecipe(
    @Headers('region') region: string,
    @Param('recipe') recipe: string,
  ): Promise<NotesDocument> {
    return await this.noteServices.fetchNoteRecipe(region, recipe);
  }

  @Get('recipeNotes/:recipe')
  public async fetchRecipeNotesRecipe(
    @GET_USER() user: UserDocument,
    @Headers('region') region: string,
    @Param('recipe') recipe: string,
  ): Promise<NotesDocument> {
    return await this.noteServices.fetchRecipeNotesRecipe(user, region, recipe);
  }

  // @Post('recipeNotes/:recipe')
  // public async insertRecipeNotesRecipe(
  //   @GET_USER() user: UserDocument,
  //   @Headers('region') region: string,
  //   @Param('recipe') recipe: string,
  //   @Body() body: UpdateNotesDTO,
  // ): Promise<NotesDocument> {
  //   return this.noteServices.insertRecipeNotesRecipe(
  //     user,
  //     region,
  //     recipe,
  //     body,
  //   );
  // }
}
