import { IsBoolean, IsOptional } from 'class-validator';
//this part is currently skipped.
export class TranslationsDTO {
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => FromDTO)
  // public from: FromDTO;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => ToDTO)
  // public to: ToDTO[];

  @IsOptional()
  @IsBoolean()
  public preserve: boolean;
}
