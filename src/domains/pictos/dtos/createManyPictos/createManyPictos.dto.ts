import { CreatePictosDto } from './subDto/createPictos.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateManyPictostDto {
  @ValidateNested({ each: true })
  @Type(() => CreatePictosDto)
  public data: CreatePictosDto[];
}
