import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FromDTO } from './from.subdto';
import { ToDTO } from './to.subdto';
import { Type } from 'class-transformer';

export class TranslationsDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => FromDTO)
  @ApiProperty({
    description: 'Category Translations From',
    type: () => FromDTO,
  })
  public from?: FromDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToDTO)
  @ApiProperty({
    description: 'Category Translation To',
    type: () => ToDTO,
  })
  public to?: ToDTO[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Do not overwrite with translations',
    type: 'String',
    default: 'True',
  })
  public preserve?: boolean;
}
