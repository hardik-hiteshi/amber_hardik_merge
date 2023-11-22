import { ApiProduces, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class NameDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'Display Name',
  })
  public displayName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'First Name',
  })
  public firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'Last Name',
  })
  public lastName?: string;
}
