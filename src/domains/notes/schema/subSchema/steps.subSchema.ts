import { Schema } from '@nestjs/mongoose';
import { StepNote } from './stepNote.subSchema';

@Schema()
export class Steps {
  [key: string]: StepNote;
}
