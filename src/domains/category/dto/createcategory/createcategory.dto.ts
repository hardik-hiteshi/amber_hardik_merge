import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TranslationsDTO } from './subdto/translations.dto';
import { Type } from 'class-transformer';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Category name',
    type: 'String',
    default: 'Category Display Name',
  })
  public name: string;

  //@IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Category niceName',
    type: 'String',
    default: 'Category niceName',
  })
  public niceName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Category image',
    type: 'String',
    default: '',
  })
  public image?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Category visibility',
    type: 'Boolean',
    default: 'True',
  })
  public visibility?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Category Landig Text',
    type: 'String',
    default: 'Category Landing Text',
  })
  public landingText?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Category synonyms',
    type: [String],
    default: 'Category synonyms',
  })
  public synonyms?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationsDTO)
  @ApiProperty({
    description: 'Category name',
    type: () => TranslationsDTO,
  })
  public translations?: TranslationsDTO;
}
