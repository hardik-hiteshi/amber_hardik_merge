import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FromDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Translations come form region',
    type: 'String',
    default: 'ES-TEST',
  })
  public region?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'NiceName from source region',
    type: 'String',
    default: 'niceName-from-source-region',
  })
  public niceName?: string;
}
