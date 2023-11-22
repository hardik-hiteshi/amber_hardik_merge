import { IsOptional, IsString } from 'class-validator';

export class SocialMediaDto {
  @IsOptional()
  @IsString()
  public instagram?: string;

  @IsOptional()
  @IsString()
  public googleplus?: string;

  @IsOptional()
  @IsString()
  public twitter?: string;

  @IsOptional()
  @IsString()
  public web?: string;

  @IsOptional()
  @IsString()
  public webName?: string;
}
