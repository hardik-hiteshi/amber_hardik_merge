import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import rAEscaleEnum from 'src/domains/recipe/schema/subSchema/enums/nutritionalKeysEnum/RAEscale.enum';
export class RAEscaleDTO {
  @IsOptional()
  @IsNumber()
  public value: number;

  @IsOptional()
  @IsString()
  @IsIn(rAEscaleEnum)
  public unit: string;
}
