import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContextFieldsDTO } from './subDTO/contextFields.DTO';
import { Type } from 'class-transformer';

export class UpdateRegionDTO {
  @IsString()
  @IsOptional()
  public language?: string;

  @IsString()
  @IsOptional()
  public adminUser?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ContextFieldsDTO)
  public contextFields?: ContextFieldsDTO[];

  @IsOptional()
  @IsString()
  public remoteEndPoint?: string;

  @IsOptional()
  @IsBoolean()
  public autoTags?: boolean;
}
