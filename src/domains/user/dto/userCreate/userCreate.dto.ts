import {
  //CommunityConditionsDto,
  ContactnDto,
  HistoryDto,
  InfoDto,
  LocationDto,
  // MemberConditionsDto,
  NameDto,
  //OtherConditionsDto,
  ProfileDto,
  RecipeDto,
  ShopItemDto,
  StatusDto,
  TranslationsDto,
} from './subDto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { BlockDTO } from './subDto/block.dto';
import { DoneDTO } from './subDto/done.subdto';
import { LegalSchemaDto } from './subDto/legalSchema.dto';
import { Role } from 'src/domains/auth/roles/permission.roles';
import { Type } from 'class-transformer';
export class UserCreateDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NameDto)
  public name?: NameDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  public location?: LocationDto;

  // @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ContactnDto)
  public contact: ContactnDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => HistoryDto)
  public history?: HistoryDto;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  public login: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  public niceName: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  public password: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProfileDto)
  public profile?: ProfileDto;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public image?: string[];

  @IsOptional()
  @IsString()
  public rank?: string;

  @IsOptional()
  @IsString()
  @IsEnum(Role)
  public role?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InfoDto)
  public info?: InfoDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StatusDto)
  public status?: StatusDto;

  @IsOptional()
  @IsArray()
  public dietPreferences?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ShopItemDto)
  public shopItem?: ShopItemDto;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public grants?: string[];

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public favorites?: string[];

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public todo?: string[];

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public badges?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LegalSchemaDto)
  public memberConditions?: LegalSchemaDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LegalSchemaDto)
  public communityConditions?: LegalSchemaDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LegalSchemaDto)
  public internationalConditions?: LegalSchemaDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LegalSchemaDto)
  public newsletterConditions?: LegalSchemaDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LegalSchemaDto)
  public ebookConditions?: LegalSchemaDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LegalSchemaDto)
  public contactConditions?: LegalSchemaDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LegalSchemaDto)
  public termsOfSale?: LegalSchemaDto;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  public following?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RecipeDto)
  public recipeList?: RecipeDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TranslationsDto)
  public translations?: TranslationsDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BlockDTO)
  public blocked: BlockDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BlockDTO)
  public blockedBy: BlockDTO[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public allowedRegions?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DoneDTO)
  public done: DoneDTO[];
}
