import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateAliasDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public model: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public alias: string;
}
