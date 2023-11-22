import { IsOptional, IsString } from 'class-validator';

export class NutritionalLegendDTO {
  @IsOptional()
  @IsString()
  public low?: string;

  @IsOptional()
  @IsString()
  public medium?: string;

  @IsOptional()
  @IsString()
  public high?: string;
}
