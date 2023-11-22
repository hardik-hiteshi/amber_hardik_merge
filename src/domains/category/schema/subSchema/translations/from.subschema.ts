import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({ _id: false })
export default class From {
  @Prop({ type: String, readonly: true })
  @ApiProperty({
    description: 'Translations come form region',
    type: 'String',
    default: 'ES-TEST',
  })
  public region: string;

  @Prop({ type: String, readonly: true })
  @ApiProperty({
    description: 'NiceName from source region',
    type: 'String',
    default: 'niceName-from-source-region',
  })
  public niceName: string;
}
