import { CreateMachineLogDto } from './create-machine-log.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateManyMachineLogDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateMachineLogDto)
  public data: CreateMachineLogDto[];
}
