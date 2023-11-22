import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RankTranslationsFromDTO } from './from.subdto';
import { RankTranslationsToDTO } from './to.subdto';
import { Type } from 'class-transformer';

export class RankTranslationsDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => RankTranslationsFromDTO)
  @ApiProperty({
    description: 'Rank translations From',
    type: () => RankTranslationsFromDTO,
  })
  public from?: RankTranslationsFromDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => RankTranslationsToDTO)
  @ApiProperty({
    description: 'Rank translations To ',
    type: () => RankTranslationsToDTO,
  })
  public to?: RankTranslationsToDTO[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Rank do not override',
    type: 'Boolean',
    default: true,
  })
  public preserve?: boolean;
}
