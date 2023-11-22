import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import featureduser from '../schema/subSchema/enums/featured.enum';

export class CreateFeatureDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredList: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredRecipes: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredUsers: string[];

  @IsNotEmpty()
  @IsString()
  @IsEnum(featureduser)
  public type: string;
}
