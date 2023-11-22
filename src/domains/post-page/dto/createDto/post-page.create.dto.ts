import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';
import { PostPageAutoPublishDTO } from './subDto/autoPublish/autoPublish.dto';
import { PostPageCMSDTO } from './subDto/cms/post-page.cms.dto';
import { PostPageCommentsDTO } from './subDto/comments/comment.dto';
import { SocialDTO } from './subDto/social/social.dto';
import { TranslationsDTO } from './subDto/translations.dto.ts/postCategory.translations.dto';
import { Type } from 'class-transformer';

export class CreatePostPageDTO {
  @IsBoolean()
  @IsOptional()
  public isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  public isVisibleHome?: boolean;

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsDateString()
  @IsOptional()
  public date?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostPageAutoPublishDTO)
  public autopublishDate?: PostPageAutoPublishDTO;

  @IsOptional()
  @IsMongoId()
  public author?: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  public category?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  public tags?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @IsString()
  public imageHeader?: string;

  @IsOptional()
  @IsString()
  public imagePreview?: string;

  @IsNotEmpty()
  @IsString()
  public shortDescription: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  public posts?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => PostPageCommentsDTO)
  public comments?: PostPageCommentsDTO[];

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PostPageCMSDTO)
  public cms: PostPageCMSDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialDTO)
  public social?: SocialDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationsDTO)
  public translations?: TranslationsDTO;
}
