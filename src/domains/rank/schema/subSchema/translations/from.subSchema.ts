import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type RankTranslationsFromDocument =
  HydratedDocument<RankTranslationsFrom>;

@Schema({ _id: false })
export class RankTranslationsFrom {
  @Prop()
  @ApiProperty({
    description: 'Rank from region',
    type: 'String',
    default: 'Es-TEST',
  })
  public region: string;

  @Prop()
  @ApiProperty({
    description: 'Rank niceName',
    type: 'String',
    default: 'Rank niceName from source',
  })
  public niceName: string;
}

export const rankTranslationsFromSchema =
  SchemaFactory.createForClass(RankTranslationsFrom);
