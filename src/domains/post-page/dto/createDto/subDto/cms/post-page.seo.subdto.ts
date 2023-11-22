import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PostPageLinkinDTO } from './post-page.linkin.dto';
import { Type } from 'class-transformer';

export class PostPageSEODTO {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsBoolean()
  public index?: boolean;

  @IsOptional()
  @IsBoolean()
  public follow?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostPageLinkinDTO)
  public linkin?: PostPageLinkinDTO[];
}
