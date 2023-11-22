import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class GeoSchema {
  @Prop()
  @ApiProperty({
    description: 'User CMS Last Login IP ',
    type: 'String',
    default: '0.005544',
  })
  public lat: number;

  @Prop()
  @ApiProperty({
    description: 'User CMS Last Login IP ',
    type: 'String',
    default: '0.005544',
  })
  public lng: number;
}
