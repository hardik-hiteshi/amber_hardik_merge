import { IsOptional, IsString } from 'class-validator';
export class ExtraDTO {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public text?: string;
}
