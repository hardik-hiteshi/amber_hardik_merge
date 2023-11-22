import {
  // ArrayUnique,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { colors } from 'src/domains/product/schema/subSchema/enum/colors.enum';

export class ProductAttributesDto {
  @IsOptional()
  @IsArray()
  //@ArrayUnique()
  //@IsString({ each: true })
  @IsIn(colors, { each: true })
  public colors?: string[];

  @IsOptional()
  @IsString()
  public measures?: string;
}
