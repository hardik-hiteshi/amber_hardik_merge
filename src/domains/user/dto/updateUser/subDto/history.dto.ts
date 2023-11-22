import { IsDateString, IsOptional, ValidateNested } from 'class-validator';
import { LastLoginDto } from './lastLogin.dto';
import { Type } from 'class-transformer';
export class HistoryDto {
  @IsOptional()
  @IsDateString()
  public registration?: Date;

  @IsOptional()
  @IsDateString()
  public unregistration?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LastLoginDto)
  public lastLoginCMS?: LastLoginDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LastLoginDto)
  public lastLoginWeb?: LastLoginDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LastLoginDto)
  public lastLoginApp?: LastLoginDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LastLoginDto)
  public lastLoginMachine?: LastLoginDto;
}
