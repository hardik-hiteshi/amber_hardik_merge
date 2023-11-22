import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import featureduser from '../schema/subSchema/enums/featured.enum';
export class UpdateFeatureDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredList: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredUsers: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredRecipes: string[];

  @IsNotEmpty()
  @IsString()
  @IsEnum(featureduser)
  public type: string;
}
