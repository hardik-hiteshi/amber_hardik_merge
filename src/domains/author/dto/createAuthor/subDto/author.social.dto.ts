import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorSocialDTO {
  @IsOptional()
  @IsString()
  public gplus: string;

  @IsOptional()
  @IsString()
  public twitter?: string;

  @IsOptional()
  @IsString()
  public instagram?: string;
}
