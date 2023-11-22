import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MachineHistoryDto, MachineInfoDto, MachineSerialDto } from './subDto';
import { Type } from 'class-transformer';

enum Status {
  enabled = 'enabled',
  disabled = 'disabled',
  lostFound = 'lost+found',
}
export class UpdateMachineDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => MachineInfoDto)
  public info?: MachineInfoDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MachineHistoryDto)
  public history?: MachineHistoryDto[];

  @IsOptional()
  @IsString()
  public mac?: string;

  @IsOptional()
  @IsDateString()
  public manufactureDate?: Date;

  @IsOptional()
  @IsString()
  public model?: string;

  @IsOptional()
  @IsDateString()
  public purchaseDate?: Date;

  @IsOptional()
  @IsString()
  public secret?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => MachineSerialDto)
  public serial?: MachineSerialDto;

  @IsOptional()
  @IsEnum(Status)
  public status?: string;
}
