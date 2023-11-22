import { IsArray, ValidateNested } from 'class-validator';
import { CreateMachineModelDto } from '../createMachineModel/createMachineModel.dto';
import { Type } from 'class-transformer';

export class CreateManyMachineModelDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMachineModelDto)
  public array: CreateMachineModelDto[];
}
