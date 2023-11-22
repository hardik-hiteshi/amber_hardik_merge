import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GeoDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: 'Number',
  })
  public lat?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: 'Number',
  })
  public lng?: number;
}
