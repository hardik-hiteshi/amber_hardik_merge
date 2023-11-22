import { IsArray, ValidateNested } from 'class-validator';
import { CreateFactoryDTO } from './createfactory.dto';
import { Type } from 'class-transformer';
export class CreateManyFactoriesDTO {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateFactoryDTO)
  public data: CreateFactoryDTO[];
}
