import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAuthorSocialDTO } from './subDto/author.social.dto';
import { Type } from 'class-transformer';

export class CreateAuthorDTO {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAuthorSocialDTO)
  public social?: CreateAuthorSocialDTO;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public image?: string[];

  @IsOptional()
  @IsString()
  public bio?: string;
}
