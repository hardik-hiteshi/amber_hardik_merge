import { IsArray, ValidateNested } from 'class-validator';
import { CreateRegionDTO } from '../createDTO/createRegion.dto';
import { Type } from 'class-transformer';

export class CreateManyRegionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRegionDTO)
  public data: CreateRegionDTO[];
}
