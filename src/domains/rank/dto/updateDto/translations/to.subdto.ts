import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RankTranslationsToDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Rank to region',
    type: 'String',
    default: 'FR-TEST',
  })
  public region?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Rank niceName in dest',
    type: 'String',
    default: 'Rank niceName',
  })
  public niceName?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Rank niceName',
    type: 'Date',
    default: '2023-10-24T17:44:22.000Z',
  })
  public lastUpdate?: Date;
}
