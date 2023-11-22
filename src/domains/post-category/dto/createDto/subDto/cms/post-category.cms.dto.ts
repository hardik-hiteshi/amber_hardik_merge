import { IsNotEmpty, IsOptional } from 'class-validator';
import { PostCategorySEODTO } from './post-category.seo.subdto';
import { PostCategoryURLDTO } from './post-category.url.subdto';
import { Type } from 'class-transformer';
export class PostCategoryCMSDTO {
  @IsOptional()
  @Type(() => PostCategoryURLDTO)
  public url: PostCategoryURLDTO;

  @IsNotEmpty()
  @Type(() => PostCategorySEODTO)
  public seo: PostCategorySEODTO;
}
