import { IsOptional, IsString } from 'class-validator';
import { PostTagUrlDto } from '../createDto/subDto/PostTagUrl.dto';

export class UpdatePostTagDTO {
  @IsOptional()
  @IsString()
  public text: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  public cms: PostTagUrlDto;
}
