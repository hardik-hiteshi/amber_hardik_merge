import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContextFieldsDTO } from './subDTO/contextFields.DTO';
import regions from 'src/common/enum/region.enum';
import { Type } from 'class-transformer';

export class CreateRegionDTO {
  @IsString()
  @IsNotEmpty()
  @IsIn(regions)
  public niceName: string;

  @IsString()
  @IsNotEmpty()
  public language: string;

  @IsNotEmpty()
  @IsString()
  public adminUser: string;

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
