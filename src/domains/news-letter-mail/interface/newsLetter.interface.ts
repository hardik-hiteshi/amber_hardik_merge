import { CreateNewsLetterDto } from '../dtos';

export interface INewsLetter extends CreateNewsLetterDto {
  region: string;
}
