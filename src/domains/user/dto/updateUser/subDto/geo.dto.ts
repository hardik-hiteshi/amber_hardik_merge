import { IsNumber, IsOptional } from 'class-validator';
export class GeoDto {
  @IsOptional()
  @IsNumber()
  public lat?: number;

  @IsOptional()
  @IsNumber()
  public lng?: number;
}
