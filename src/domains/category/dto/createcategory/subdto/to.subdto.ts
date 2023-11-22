import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ToDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Target region',
    type: 'String',
    default: 'FR-TEST',
  })
  public region?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'NiceName target region',
    type: 'String',
    default: 'nicename-target-region',
  })
  public niceName?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Translations To Date',
    type: 'String',
    default: '2023-10-24',
  })
  public lastUpdate?: string;
}
