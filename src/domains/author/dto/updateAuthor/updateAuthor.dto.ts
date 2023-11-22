import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAuthorSocialDTO } from '../updateAuthor/subDto/author.social.dto';

export class UpdateAuthorDTO {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAuthorSocialDTO)
  public social?: UpdateAuthorSocialDTO;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public image?: string[];

  @IsOptional()
  @IsString()
  public bio?: string;
}
