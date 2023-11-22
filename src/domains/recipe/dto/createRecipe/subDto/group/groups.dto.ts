import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StepsDTO } from './steps.dto';
import { Type } from 'class-transformer';
export class GroupsDTO {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepsDTO)
  public steps?: StepsDTO[];
}
