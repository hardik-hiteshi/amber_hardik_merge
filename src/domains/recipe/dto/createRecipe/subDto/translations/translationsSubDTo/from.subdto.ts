import { IsOptional, IsString } from 'class-validator';
export class RecipeFromDTO {
  @IsOptional()
  @IsString()
  public region?: string;

  @IsOptional()
  @IsString()
  public niceName?: string;
}
