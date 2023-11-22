import { IsOptional, IsString } from 'class-validator';
export class LayerNestedDTO {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public shortText?: string;

  @IsOptional()
  @IsString()
  public legalText?: string;
}
