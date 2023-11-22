import { IsOptional, IsString } from 'class-validator';

export class ContextFieldsDTO {
  @IsString()
  @IsOptional()
  public regex?: string;

  @IsString()
  @IsOptional()
  public context?: string;
}
