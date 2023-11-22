import { IsNotEmpty, IsNumber } from 'class-validator';

export class DetailDTO {
  @IsNotEmpty()
  @IsNumber()
  public type: number;

  @IsNotEmpty()
  @IsNumber()
  public value: number;
}
