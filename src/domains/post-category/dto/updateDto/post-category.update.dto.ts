import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';
import { PostCategoryCMSDTO } from '../createDto/subDto/cms/post-category.cms.dto';
import { TranslationsDTO } from '../createDto/subDto/translations.dto.ts/postCategory.translations.dto';
import { Type } from 'class-transformer';
export class UpdatePostCategoryDTO {
  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsOptional()
  @IsMongoId()
  public parent?: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostCategoryCMSDTO)
  public cms: PostCategoryCMSDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationsDTO)
  public translations: TranslationsDTO;
}
