import { IsDateString, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LastLoginDto } from './lastLogin.dto';
import { Type } from 'class-transformer';
export class HistoryDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: 'Date',
  })
  public registration?: Date;

  @IsDateString()
  @ApiProperty({
    type: 'Date',
  })
  public unregistration?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  @ApiProperty({
    type: () => LastLoginDto,
  })
  public lastLoginCMS?: LastLoginDto;
}
