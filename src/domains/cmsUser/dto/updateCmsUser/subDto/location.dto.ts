import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LocationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public zip?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public town?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public country?: string;
}
