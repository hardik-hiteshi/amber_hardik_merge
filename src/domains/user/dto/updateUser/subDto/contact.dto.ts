import { IsOptional, IsString } from 'class-validator';
export class ContactnDto {
  @IsOptional()
  @IsString()
  public phone?: string;

  @IsOptional()
  @IsString()
  public mail?: string;
}
