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
    default: '2023-10-24',
  })
  public date?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: '192.168.1.1',
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
    default: 'Mycook Swagger',
  })
  public userAgent?: string;
}
