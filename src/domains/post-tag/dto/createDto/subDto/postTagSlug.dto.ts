import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PostTagSlugDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public slug: string;
}
