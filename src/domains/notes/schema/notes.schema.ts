import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Steps } from './subSchema/steps.subSchema';

export type NotesDocument = HydratedDocument<Notes>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Notes {
  @Prop({ required: true })
  public user: string;

  @Prop({ required: true })
  public recipe: string;

  @Prop({ required: true })
  public region: string;

  @Prop({ default: {}, required: true })
  public steps: Steps;
}

export const notesSchema = SchemaFactory.createForClass(Notes);
