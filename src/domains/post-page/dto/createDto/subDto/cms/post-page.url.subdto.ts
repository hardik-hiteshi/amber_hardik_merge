import { IsOptional, IsString } from 'class-validator';

export class PostPageURLDTO {
  @IsOptional()
  @IsString()
  public slug: string;

  @IsOptional()
  @IsString()
  public fullUrl?: string;
}
