import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { DietFromDto } from './from.dto';
import { DietToDto } from './to.dto';
import { Type } from 'class-transformer';

export class TranslationDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => DietFromDto)
  public from?: DietFromDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DietToDto)
  public to?: DietToDto;

  @IsOptional()
  @IsBoolean()
  public preserve?: boolean;
}
