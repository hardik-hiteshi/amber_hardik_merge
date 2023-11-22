import { CreateFoodGroupDto } from './subDto/createFoodGroup.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateManyFoodGroupDto {
  @ValidateNested({ each: true })
  @Type(() => CreateFoodGroupDto)
  public data: CreateFoodGroupDto[];
}
