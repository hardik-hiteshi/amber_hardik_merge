import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { FromDTO } from './translation.from.dto';
import { ToDTO } from './translationTo.dto';
import { Type } from 'class-transformer';
export class TranslationsDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => FromDTO)
  public from: FromDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToDTO)
  public to: ToDTO[];

  @IsOptional()
  @IsBoolean()
  public preserve: boolean;
}
