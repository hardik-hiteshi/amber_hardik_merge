import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StepsDTO } from './alternative-recipe.steps.subdto';
import { Type } from 'class-transformer';
export class GroupsDTO {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => StepsDTO)
  public steps?: StepsDTO[];
}
