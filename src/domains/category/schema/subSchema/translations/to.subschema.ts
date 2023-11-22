import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({ _id: false })
export default class To {
  @Prop({ type: String, readonly: true })
  @ApiProperty({
    description: 'Target region',
    type: 'String',
    default: 'FR-TEST',
  })
  public region: string;

  @Prop({ type: String, readonly: true })
  @ApiProperty({
    description: 'NiceName target region',
    type: 'String',
    default: 'nicename-target-region',
  })
  public niceName: string;

  @Prop({ type: Date, readonly: true })
  @ApiProperty({
    description: 'Translations To Date',
    type: 'String',
    default: '2023-10-24',
  })
  public lastUpdate: Date;
}
