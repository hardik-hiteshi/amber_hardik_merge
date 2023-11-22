import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ContactnDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: '654321987',
  })
  public phone?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'test@test.es',
  })
  public mail: string;
}
