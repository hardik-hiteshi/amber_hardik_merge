import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import factorymachinetypes from '../schema/subSchema/enums/factorymachinetype.enum';
export class UpdateFactoryDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(factorymachinetypes)
  public machineType: string;

  @IsOptional()
  @IsString()
  public validBatch?: string;

  @IsOptional()
  @IsString()
  public validCompatCode?: string;

  @IsOptional()
  @IsString()
  public validSerialRange?: string;

  @IsOptional()
  @IsString()
  public validSecretRange?: string;
  @IsOptional()
  @IsString()
  public validCdRange?: string;

  @IsOptional()
  @IsString()
  public ip?: string;

  @IsOptional()
  @IsBoolean()
  public enabled?: boolean;
}
