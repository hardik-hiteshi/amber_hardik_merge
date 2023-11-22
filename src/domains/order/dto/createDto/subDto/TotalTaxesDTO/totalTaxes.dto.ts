import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { DetailDTO } from '../DetailsDTO/detail.dto';
import { Type } from 'class-transformer';

export class TotalTaxesDTO {
  @IsNotEmpty()
  @IsNumber()
  public total?: number;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DetailDTO)
  public detail: DetailDTO[];
}
