import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import iUscale from 'src/domains/recipe/schema/subSchema/enums/nutritionalKeysEnum/IUScale.enum';
export class IUscaleDTO {
  @IsOptional()
  @IsNumber()
  public value: number;
  @IsOptional()
  @IsString()
  @IsIn(iUscale)
  public unit: string;
}
