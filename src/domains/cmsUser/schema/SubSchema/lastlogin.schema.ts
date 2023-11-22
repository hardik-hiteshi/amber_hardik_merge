import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { GeoSchema } from './geo.schema';

export interface IlastLogin {
  date: Date;
  ip: string;
  geo: GeoSchema;
  userAgent: string;
}
@Schema({ _id: false })
export default class LastLogin {
  @Prop()
  @ApiProperty({
    description: 'User CMS Last Login Date',
    type: 'Date',
    default: '2023-10-24',
  })
  public date: Date;

  @Prop()
  @ApiProperty({
    description: 'User CMS Last Login IP ',
    type: 'String',
    default: '192.168.1.1',
  })
  public ip: string;

  @Prop()
  @ApiProperty({
    description: 'User CMS Last login Geo location ',
    type: () => GeoSchema,
  })
  public geo: GeoSchema;

  @Prop()
  @ApiProperty({
    description: 'User CMS Last Login User Agent',
    type: 'String',
    default: 'Mycook Swagger',
  })
  public userAgent: string;
}
// export const LastLoginSchema = SchemaFactory.createForClass(LastLogin);
