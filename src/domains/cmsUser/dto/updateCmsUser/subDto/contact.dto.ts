import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ContactnDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public mail?: string;
}
