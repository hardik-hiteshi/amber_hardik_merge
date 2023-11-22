import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Region } from '../enum/region.enum';

export class CreateTipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tips text',
    type: 'String',
    default: 'This is a TIP',
  })
  public text: string;

  // @IsString()
  // @IsEnum(Region)
  // @IsNotEmpty()
  // public region: string;
}
