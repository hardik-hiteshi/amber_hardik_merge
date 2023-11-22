import { IsBoolean, IsOptional } from 'class-validator';

export class NewsMediaDto {
  @IsOptional()
  @IsBoolean()
  public voice?: boolean;

  @IsOptional()
  @IsBoolean()
  public machine?: boolean;
}
