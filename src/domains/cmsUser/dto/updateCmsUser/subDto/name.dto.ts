import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class NameDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public displayName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public lastName?: string;
}
