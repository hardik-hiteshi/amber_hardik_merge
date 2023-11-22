import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LocationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'Av barcelona',
  })
  public address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: '25280',
  })
  public zip?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'Oliana',
  })
  public town?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'ES',
  })
  public state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'Catalonia',
  })
  public country?: string;
}
