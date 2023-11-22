import { IsArray, ValidateNested } from 'class-validator';
import { SerialDto } from './subDto/serial.dto';
import { Type } from 'class-transformer';

export class CreateManyMachineDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SerialDto)
  public array: SerialDto[];
}
