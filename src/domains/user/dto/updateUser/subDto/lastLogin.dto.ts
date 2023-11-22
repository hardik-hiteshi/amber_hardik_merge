import {
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GeoDto } from './geo.dto';
import { Type } from 'class-transformer';
export class LastLoginDto {
  @IsOptional()
  @IsDateString()
  public date?: Date;

  @IsOptional()
  @IsString()
  public ip?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GeoDto)
  public geo?: GeoDto;

  @IsOptional()
  @IsString()
  public userAgent?: string;
}
