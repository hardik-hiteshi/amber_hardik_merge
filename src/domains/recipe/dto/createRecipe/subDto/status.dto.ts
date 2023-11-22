import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import nutritionalEnum from 'src/domains/recipe/schema/subSchema/enums/status.nutritional.enum';

export class StatusDTO {
  @IsOptional()
  @IsBoolean()
  public exportable?: boolean;

  @IsOptional()
  @IsBoolean()
  public verified?: boolean;

  @IsOptional()
  @IsString()
  public idParent?: string;

  @IsOptional()
  @IsString()
  @IsEnum(nutritionalEnum)
  public nutritional?: string;
}
