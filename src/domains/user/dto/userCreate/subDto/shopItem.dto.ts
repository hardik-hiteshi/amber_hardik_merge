import { IsOptional, IsString } from 'class-validator';
export class ShopItemDto {
  @IsOptional()
  @IsString()
  public ingredient?: string;

  @IsOptional()
  @IsString()
  public qty?: string;

  @IsOptional()
  @IsString()
  public unit?: string;
}
