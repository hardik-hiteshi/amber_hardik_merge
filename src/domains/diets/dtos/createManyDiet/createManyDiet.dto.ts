import { CreateDietDto } from './createDiet.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateManyDietDto {
  @ValidateNested({ each: true })
  @Type(() => CreateDietDto)
  public data: CreateDietDto[];
}
