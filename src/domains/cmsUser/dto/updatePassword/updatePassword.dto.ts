import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'CurrentPassword',
  })
  public currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'NewSecurePassword',
  })
  public newPassword: string;
}
