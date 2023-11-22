import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class ContactnDto {
  @IsOptional()
  @IsString()
  public phone?: string;

  @IsNotEmpty()
  @IsString()
  public mail: string;
}
