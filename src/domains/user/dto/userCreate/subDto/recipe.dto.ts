import { IsOptional, IsString } from 'class-validator';
export class RecipeDto {
  @IsOptional()
  @IsString()
  public niceName?: string;

  @IsOptional()
  @IsString()
  public title?: string;
}
