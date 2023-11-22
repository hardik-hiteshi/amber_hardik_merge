import { MachineSerialDto } from '../../createMachine/subDto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SerialDto {
  @ValidateNested()
  @Type(() => MachineSerialDto)
  public serial: MachineSerialDto;
}

// @IsString()
// @IsNotEmpty()
// public code: string;
