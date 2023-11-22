import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  public currentPassword: string;

  @IsNotEmpty()
  @IsString()
  public newPassword: string;
}
