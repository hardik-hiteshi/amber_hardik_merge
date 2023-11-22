/* eslint-disable @typescript-eslint/naming-convention */
// user.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAffiliateConfigDTO {
  @IsNotEmpty()
  @IsNumber()
  public cookie_time: number;

  @IsNotEmpty()
  @IsString()
  public cookie_name: string;
}
