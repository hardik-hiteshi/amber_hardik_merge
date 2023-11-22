/* eslint-disable @typescript-eslint/naming-convention */
import { IsNotEmpty, IsString } from 'class-validator';
export class MachineSerialDto {
  @IsString()
  @IsNotEmpty()
  public batch: string;

  @IsString()
  @IsNotEmpty()
  public compatibility_code: string;

  @IsString()
  @IsNotEmpty()
  public counter: string;

  @IsString()
  @IsNotEmpty()
  public control: string;
}
