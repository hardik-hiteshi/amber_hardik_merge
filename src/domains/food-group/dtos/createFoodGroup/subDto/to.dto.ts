import { IsDateString, IsOptional, IsString } from 'class-validator';
// import regions from 'src/common/enum/region.enum';

export class DietToDto {
  @IsOptional()
  @IsString()
  public niceName?: string;

  @IsOptional()
  @IsString()
  // @IsIn(regions)
  public region?: string;

  @IsOptional()
  @IsDateString()
  public lastUpdate?: Date;
}
