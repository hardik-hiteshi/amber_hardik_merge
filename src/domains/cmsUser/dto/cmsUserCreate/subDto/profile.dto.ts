import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: '2023-10-24',
  })
  public birthday?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: '2023-10-24',
  })
  public language?: string;
}
