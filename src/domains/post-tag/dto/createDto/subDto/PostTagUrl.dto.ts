import { PostTagSlugDto } from './postTagSlug.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class PostTagUrlDto {
  @ValidateNested()
  @Type(() => PostTagSlugDto)
  public url: PostTagSlugDto;
}
