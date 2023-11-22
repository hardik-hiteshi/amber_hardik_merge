import { IsOptional, IsString } from 'class-validator';

export class SourceDTO {
  @IsOptional()
  @IsString()
  public url?: string;

  @IsOptional()
  @IsString()
  public name?: string;
}
