import { CreateEbookMultiDTO } from './createEbook.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateManyEbookDto {
  @ValidateNested({ each: true })
  @Type(() => CreateEbookMultiDTO)
  public data: CreateEbookMultiDTO[];
}
