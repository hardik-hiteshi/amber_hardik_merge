import {
  CategoriesDTO,
  CommentsDTO,
  GrantsDTO,
  GroupsDTO,
  RatingsDTO,
  SeoDTO,
  SocialDTO,
  SourceDTO,
} from './subDto';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import difficultyEnum from '../../schema/subSchema/enums/difficulty.enum';
import recipecourses from '../../schema/subSchema/enums/recipecourse.enum';

import { InfoDTO } from '../createRecipe/subDto/info.dto';
import { Schema as mongooseSchema } from 'mongoose';
import { NutritionalKeysDTO } from './subDto/nutritionalkeys/nutritionalkeys.dto';
import { RecipeTranslationsDTO } from './subDto/translations/recipetranslations.dto';
import { StatusDTO } from './subDto/status.dto';
import { Type } from 'class-transformer';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public category?: string;

  @IsOptional()
  @IsNumber()
  public rate?: number;

  @IsOptional()
  @IsString()
  public categoryNiceName?: string;

  @IsOptional()
  @IsMongoId()
  public catId?: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoriesDTO)
  public categories?: CategoriesDTO[];

  @IsOptional()
  @IsIn(recipecourses, { each: true })
  public course: string[];

  @IsOptional()
  @IsMongoId()
  public user?: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InfoDTO)
  public info?: InfoDTO;

  @IsOptional()
  @IsNumber()
  public totalTime?: number;

  @IsOptional()
  @IsNumber()
  public cookTime?: number;

  @IsOptional()
  @IsNumber()
  @IsIn(difficultyEnum)
  public difficulty?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(3)
  public price?: number;

  @IsOptional()
  @IsObject()
  public size: object;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StatusDTO)
  public status?: StatusDTO;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public foodGroups: string[];

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public images?: string[];

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public videos?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GroupsDTO)
  public groups?: GroupsDTO[];

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public tags: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SocialDTO)
  public social?: SocialDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  public comments?: CommentsDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RatingsDTO)
  public ratings?: RatingsDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SourceDTO)
  public source?: SourceDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GrantsDTO)
  public grants?: GrantsDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NutritionalKeysDTO)
  public nutritional?: NutritionalKeysDTO;

  @IsOptional()
  @IsBoolean()
  public nutritionalForRation?: boolean;

  @IsOptional()
  @IsString()
  public advice?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SeoDTO)
  public seo?: SeoDTO;

  @IsOptional()
  @IsArray()
  // @IsObject({ each: true })
  public rations?: mongooseSchema.Types.Mixed[];

  @IsOptional()
  @IsBoolean()
  public imageRights?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RecipeTranslationsDTO)
  public translations?: RecipeTranslationsDTO;

  @IsOptional()
  @IsString()
  public viewUrl?: string;

  @IsOptional()
  @IsString()
  public copyUrl?: string;

  @IsOptional()
  @IsObject()
  public compatibility: object;
}
