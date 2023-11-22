import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ProductUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public slug: string;
}
