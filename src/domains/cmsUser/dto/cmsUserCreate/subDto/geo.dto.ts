import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GeoDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: 'Number',
    default: '0.005544',
  })
  public lat?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: 'Number',
    default: '0.005544',
  })
  public lng?: number;
}
