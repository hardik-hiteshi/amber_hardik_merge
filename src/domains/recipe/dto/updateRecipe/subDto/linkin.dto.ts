import { IsOptional, IsString } from 'class-validator';
export class LinkinDTO {
  @IsOptional()
  @IsString()
  public url?: string;

  @IsOptional()
  @IsString()
  public text?: string;
}
