import { IsOptional, ValidateNested } from 'class-validator';
import { PostPageSEODTO } from './post-page.seo.subdto';
import { PostPageURLDTO } from './post-page.url.subdto';
import { Type } from 'class-transformer';

export class PostPageCMSDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => PostPageURLDTO)
  public url: PostPageURLDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostPageSEODTO)
  public seo?: PostPageSEODTO;
}
