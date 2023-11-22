import { IsOptional, IsString } from 'class-validator';

export class IngredientsDTO {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public qty?: string;

  @IsOptional()
  @IsString()
  public prep?: string;

  @IsOptional()
  @IsString()
  public unit?: string;

  @IsOptional()
  @IsString()
  public extra?: string;
}
