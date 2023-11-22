import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class InfoDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: 'Date',
  })
  public creationDate?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: 'Date',
  })
  public modificationDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public creationSource?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
  })
  public modificationSource?: string;
}
