import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RankTranslationsFromDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Rank from region',
    type: 'String',
    default: 'Es-TEST',
  })
  public region?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Rank niceName',
    type: 'String',
    default: 'Rank niceName from source',
  })
  public niceName?: string;
}
