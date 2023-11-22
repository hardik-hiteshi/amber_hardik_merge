import { NewsLetterDto } from './subDto/createNewsLetter.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateManyNewsLetterDto {
  @ValidateNested({ each: true })
  @Type(() => NewsLetterDto)
  public data: NewsLetterDto[];
}
