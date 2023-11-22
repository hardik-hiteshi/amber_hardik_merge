import { IsOptional, IsString } from 'class-validator';

export class CreatePictosDto {
  @IsString()
  @IsOptional()
  public niceName: string;

  @IsOptional()
  @IsString({ each: true })
  public image: string[];
}
