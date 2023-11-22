import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MachineHistoryDto, MachineInfoDto, MachineSerialDto } from './subDto/';
import { Type } from 'class-transformer';

enum Status {
  enabled = 'enabled',
  disabled = 'disabled',
  lostFound = 'lost+found',
}
export class CreateMachineDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => MachineInfoDto)
  public info?: MachineInfoDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MachineHistoryDto)
  public history?: MachineHistoryDto[];

  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  public mac?: string;

  // @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  public manufactureDate?: Date;

  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  public model?: string;

  // @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  public purchaseDate?: Date;

  @IsOptional()
  @IsString()
  public secret?: string;

  @IsOptional()
  @IsDateString()
  public lastLogin?: Date;

  @IsOptional()
  @IsString()
  public lastIP?: string;

  @IsOptional()
  @IsString()
  public lastUser?: string;

  @IsOptional()
  @IsString()
  public lastUserAgent?: string;

  @IsOptional()
  @IsObject()
  public lastGeo?: object;

  @IsOptional()
  @IsDateString()
  public lastLoginFail?: Date;

  @IsOptional()
  @IsString()
  public lastIPFail?: string;

  @IsOptional()
  @IsString()
  public lastUserAgentFail?: string;

  @IsOptional()
  @IsObject()
  public lastGeoFail?: object;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MachineSerialDto)
  public serial: MachineSerialDto;

  @IsOptional()
  @IsEnum(Status)
  public status?: string;
}
