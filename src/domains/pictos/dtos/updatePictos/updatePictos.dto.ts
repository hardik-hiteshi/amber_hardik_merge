import { IsOptional, IsString } from 'class-validator';

export class UpdatePictosDto {
  @IsOptional()
  @IsString({ each: true })
  public image: string[];
}
