import { IsOptional, IsString } from 'class-validator';

export class PostPageLinkinDTO {
  @IsOptional()
  @IsString()
  public text?: string;

  @IsOptional()
  @IsString()
  public url?: string;
}
