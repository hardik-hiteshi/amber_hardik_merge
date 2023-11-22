import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostTagUrlDto } from './subDto/PostTagUrl.dto';

export class CreatePostTagDTO {
  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsNotEmpty()
  public cms: PostTagUrlDto;
}
