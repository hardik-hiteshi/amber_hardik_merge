import { IsBoolean, IsOptional } from 'class-validator';
export class StatusDto {
  @IsOptional()
  @IsBoolean()
  public advertisement?: boolean;

  @IsOptional()
  @IsBoolean()
  public taurusInfo?: boolean;

  @IsOptional()
  @IsBoolean()
  public commercials?: boolean;

  @IsOptional()
  @IsBoolean()
  public promo?: boolean;

  @IsOptional()
  @IsBoolean()
  public publicProfile?: boolean;

  @IsOptional()
  @IsBoolean()
  public feedback?: boolean;

  @IsOptional()
  @IsBoolean()
  public newsletter?: boolean;

  @IsOptional()
  @IsBoolean()
  public privacy?: boolean;
}
