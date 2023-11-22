import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import energyScale from 'src/domains/recipe/schema/subSchema/enums/nutritionalKeysEnum/EnergyScale.enum';
export class EnergyScaleDTO {
  @IsOptional()
  @IsNumber()
  public value: number;
  @IsOptional()
  @IsString()
  @IsIn(energyScale)
  public unit: string;
}
