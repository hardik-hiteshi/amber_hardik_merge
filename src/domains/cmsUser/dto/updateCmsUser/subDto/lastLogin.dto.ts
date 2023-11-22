import {
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GeoDto } from './geo.dto';
import { Type } from 'class-transformer';
export class LastLoginDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: 'Date',
  })
  public date?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public ip?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => GeoDto)
  @ApiProperty({
    type: () => GeoDto,
  })
  public geo?: GeoDto;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public userAgent?: string;
}
