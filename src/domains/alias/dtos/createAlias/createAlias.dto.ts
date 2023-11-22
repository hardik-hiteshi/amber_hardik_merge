import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAliasDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public niceName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public model: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public alias: string;
}
