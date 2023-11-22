import { IsOptional, IsString } from 'class-validator';

export class ToDTO {
  @IsOptional()
  @IsString()
  public region: string;

  @IsOptional()
  @IsString()
  public niceName: string;

  @IsOptional()
  @IsString()
  public lastUpdate: Date;
}
