import { IsOptional, IsString } from 'class-validator';

export class FromDTO {
  @IsOptional()
  @IsString()
  public region: string;

  @IsOptional()
  @IsString()
  public niceName: string;
}
