/* eslint-disable @typescript-eslint/naming-convention */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateAffiliateConfigDTO } from '../createDto/createAffiliateConfig.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAffiliateConfigDTO extends PartialType(
  CreateAffiliateConfigDTO,
) {
  @IsNotEmpty()
  @IsNumber()
  public cookie_time: number;

  @IsNotEmpty()
  @IsString()
  public cookie_name: string;
}
