/* eslint-disable @typescript-eslint/naming-convention */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public niceName: string;

  @IsOptional()
  public image?: Schema.Types.Mixed;

  @IsString()
  @IsNotEmpty()
  public contact_1: string;

  @IsOptional()
  @IsString()
  public contact_2?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}
