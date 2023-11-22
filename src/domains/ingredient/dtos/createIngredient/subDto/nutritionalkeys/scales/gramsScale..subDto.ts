import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import gramScale from 'src/domains/recipe/schema/subSchema/enums/nutritionalKeysEnum/gramScale.enum';

export class GramsScaleDTO {
  @IsOptional()
  @IsNumber()
  public value: number;
  @IsOptional()
  @IsString()
  @IsIn(gramScale)
  public unit: string;
}
