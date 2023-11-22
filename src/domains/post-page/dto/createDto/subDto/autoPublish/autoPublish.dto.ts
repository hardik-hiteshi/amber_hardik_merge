import { IsDateString, IsOptional } from 'class-validator';

export class PostPageAutoPublishDTO {
  @IsOptional()
  @IsDateString()
  public type: Date;
}
