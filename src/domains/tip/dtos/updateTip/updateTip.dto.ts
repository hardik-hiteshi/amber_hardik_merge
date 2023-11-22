import { IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Region } from '../enum/region.enum';

export class UpdateTipDto {
  @ValidateIf((o) => !o.region)
  @IsString()
  @ApiProperty({
    description: 'Tips text',
    type: 'String',
    default: 'This is a TIP',
  })
  public text: string;

  // @ValidateIf((o) => !o.text)
  // @IsString()
  // @IsEnum(Region)
  // public region: string;
}
