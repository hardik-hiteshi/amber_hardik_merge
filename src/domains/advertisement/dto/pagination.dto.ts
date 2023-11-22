import { IsOptional, IsString } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsString()
  public profile?: string;

  @IsOptional()
  @IsString()
  public order?: string;

  @IsOptional()
  @IsString()
  public skip?: string;

  @IsOptional()
  @IsString()
  public limit?: string;
}
