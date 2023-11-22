import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
export class DoneDTO {
  @IsOptional()
  @IsString()
  public niceName: string;
  @IsOptional()
  @IsDateString()
  public firstTime: Date;
  @IsOptional()
  @IsDateString()
  public lastTime: Date;
  @IsOptional()
  @IsNumber()
  public cooked: number;
}
