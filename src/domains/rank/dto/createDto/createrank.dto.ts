import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RankTranslationsDTO } from './subDto/translations/translations.dto';
import { Type } from 'class-transformer';
export class CreateRankDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Rank name',
    type: 'String',
    default: 'Rank Display Name',
  })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Rank niceName',
    type: 'String',
    default: 'Rank niceName',
  })
  public niceName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Rank image',
    type: 'String',
    default: '',
  })
  public image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Rank description',
    type: 'String',
    default: 'Rank Description',
  })
  public description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => RankTranslationsDTO)
  @ApiProperty({
    description: 'Rank translations',
    type: () => RankTranslationsDTO,
  })
  public translations?: RankTranslationsDTO;
}
