import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PackWithValueDTO {
  @IsOptional()
  @IsString()
  public product?: string;

  @IsNumber()
  @IsOptional()
  public quantity?: number;

  @IsNumber()
  @IsOptional()
  public value?: number;
}
