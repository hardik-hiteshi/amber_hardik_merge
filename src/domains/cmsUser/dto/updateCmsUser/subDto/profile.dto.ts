import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public birthday?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public language?: string;
}
