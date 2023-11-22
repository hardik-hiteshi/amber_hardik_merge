import { IsOptional, IsString } from 'class-validator';
export class NameDto {
  @IsOptional()
  @IsString()
  public displayName?: string;

  @IsOptional()
  @IsString()
  public firstName?: string;

  @IsOptional()
  @IsString()
  public lastName?: string;
}
