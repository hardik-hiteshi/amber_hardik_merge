import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import From from './from.subschema';
import To from './to.subschema';

@Schema()
export class Translations {
  @Prop(From)
  @ApiProperty({
    description: 'Category Translations From',
    type: () => From,
  })
  public from: From;

  @Prop([To])
  @ApiProperty({
    description: 'Category Translation To',
    type: () => To,
  })
  public to: To[];

  @Prop()
  @ApiProperty({
    description: 'Do not overwrite with translations',
    type: 'String',
    default: 'True',
  })
  public preserve: boolean;
}
