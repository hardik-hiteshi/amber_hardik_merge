import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { FromDto } from './from.dto';
import { ToDto } from './to.dto';
import { Type } from 'class-transformer';
export class TranslationsDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FromDto)
  public from?: FromDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToDto)
  public to?: ToDto[];

  @IsOptional()
  @IsBoolean()
  public preserve?: boolean;
}
