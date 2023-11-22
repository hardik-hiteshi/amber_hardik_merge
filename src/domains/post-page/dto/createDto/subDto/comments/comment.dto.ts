import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PostPageCommentsDTO {
  @IsNotEmpty()
  @IsDateString()
  public date: Date;

  @IsNotEmpty()
  @IsString()
  public displayName: string;

  @IsNotEmpty()
  @IsString()
  public niceName: string;

  @IsNotEmpty()
  @IsString()
  public rank: string;

  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => PostPageCommentsDTO)
  public comments?: PostPageCommentsDTO[];
}
