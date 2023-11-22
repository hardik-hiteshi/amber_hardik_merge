import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';

export class LineDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public quantity: number;

  @IsNotEmpty()
  public productId: mongooseSchema.Types.Mixed;

  @IsString()
  @IsOptional()
  public name?: string;
}
