import { IsNumber } from 'class-validator';

export class SocialDTO {
  @IsNumber()
  public comments: number;
}
