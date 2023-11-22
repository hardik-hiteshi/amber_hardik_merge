import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import regions from 'src/common/enum/region.enum';

export type TipDocument = HydratedDocument<Tip>;
@Schema({
  shardKey: {
    region: 1,
  },
})
export class Tip {
  // @Prop()
  // @ApiProperty({
  //   description: 'Tips Unique ID',
  //   type: 'String',
  //   default: '1',
  // })
  // public uniqueId: string;

  @Prop({ type: String, required: true })
  @ApiProperty({
    description: 'Tips text',
    type: 'String',
    default: 'This is a TIP',
  })
  public text: string;

  @Prop({
    type: String,
    required: true,
    enum: regions,
    title: 'Region',
  })
  @ApiProperty({
    description: 'Tips region',
    type: 'String',
    enum: regions,
    default: 'ES-TEST',
  })
  public region: string;
}

export const tipSchema = SchemaFactory.createForClass(Tip);
