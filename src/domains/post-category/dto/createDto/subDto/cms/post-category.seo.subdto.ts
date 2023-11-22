import { IsNotEmpty, IsString } from 'class-validator';

export class PostCategorySEODTO {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;
}
