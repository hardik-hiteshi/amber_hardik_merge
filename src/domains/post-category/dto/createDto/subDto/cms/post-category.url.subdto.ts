import { IsNotEmpty, IsString } from 'class-validator';

export class PostCategoryURLDTO {
  @IsNotEmpty()
  @IsString()
  public slug: string;
}
