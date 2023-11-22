import { IsOptional, IsString } from 'class-validator';
// import regions from 'src/common/enum/region.enum';

export class DietFromDto {
  @IsOptional()
  @IsString()
  public niceName?: string;

  @IsOptional()
  @IsString()
  //@IsIn(regions)
  public region?: string;
}
