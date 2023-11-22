/* eslint-disable @typescript-eslint/naming-convention */
import { IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  public image?: Schema.Types.Mixed;

  @IsOptional()
  @IsString()
  public contact_1?: string;

  @IsOptional()
  @IsString()
  public contact_2?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}
