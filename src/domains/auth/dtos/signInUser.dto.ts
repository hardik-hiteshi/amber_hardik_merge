import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  @ApiProperty({
    description: 'Password defined by user',
    type: String,
    default: 'UserPassword',
  })
  public password: string;

  @IsNotEmpty()
  @IsString()
  // @IsEmail()
  @ApiProperty({
    description: 'Login or Email defined by user',
    type: String,
    default: 'login-or-email',
  })
  public login: string;
}
