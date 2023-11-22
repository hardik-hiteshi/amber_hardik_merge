import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import regions from 'src/common/enum/region.enum';

export class CreatePictosDto {
  @IsString()
  @IsNotEmpty()
  public niceName: string;

  @IsNotEmpty()
  @IsString({ each: true })
  public image: string[];

  @IsNotEmpty()
  @IsString()
  @IsIn(regions)
  public region: string;
}
