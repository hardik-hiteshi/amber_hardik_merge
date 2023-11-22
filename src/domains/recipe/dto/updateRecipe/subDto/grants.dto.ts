import { IsArray, IsOptional, IsString } from 'class-validator';
export class GrantsDTO {
  @IsOptional()
  @IsString()
  public _?: string;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public view?: string[];

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public search?: string[];
}
