import { IsOptional, IsString } from 'class-validator';
export class BlockDTO {
  @IsOptional()
  @IsString()
  public niceName?: string;
}
