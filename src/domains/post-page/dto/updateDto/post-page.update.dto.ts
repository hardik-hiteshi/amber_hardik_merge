import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';
import { PostPageAutoPublishDTO } from '../createDto/subDto/autoPublish/autoPublish.dto';
import { PostPageCMSDTO } from '../createDto/subDto/cms/post-page.cms.dto';
import { PostPageCommentsDTO } from '../createDto/subDto/comments/comment.dto';
import { SocialDTO } from '../createDto/subDto/social/social.dto';
import { TranslationsDTO } from '../createDto/subDto/translations.dto.ts/postCategory.translations.dto';
import { Type } from 'class-transformer';

export class UpdatePostPageDTO {
  @IsBoolean()
  @IsOptional()
  public isActive: boolean;

  @IsBoolean()
  @IsOptional()
  public isVisibleHome: boolean;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  public shortDescription: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  public posts?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => PostPageCommentsDTO)
  public comments?: PostPageCommentsDTO[];

  @ValidateNested()
  @IsOptional()
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
