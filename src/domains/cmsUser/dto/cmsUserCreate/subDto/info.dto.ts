import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class InfoDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: 'Date',
    default: '2023-10-24',
  })
  public creationDate?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: 'Date',
    default: '2023-10-24',
  })
  public modificationDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'Mycook Swagger',
  })
  public creationSource?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'Mycook Swagger',
  })
  public modificationSource?: string;
}
