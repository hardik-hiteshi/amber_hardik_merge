import { IsOptional, IsString } from 'class-validator';

export class FromDto {
  @IsOptional()
  @IsString()
  public region?: string;

  @IsOptional()
  @IsString()
  public niceName?: string;
}
