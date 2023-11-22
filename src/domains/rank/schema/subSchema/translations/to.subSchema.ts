import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type RankTranslationsToDocument = HydratedDocument<RankTranslationsTo>;

@Schema({ _id: false })
export class RankTranslationsTo {
  @Prop()
  @ApiProperty({
    description: 'Rank to region',
    type: 'String',
    default: 'FR-TEST',
  })
  public region: string;

  @Prop()
  @ApiProperty({
    description: 'Rank niceName in dest',
    type: 'String',
    default: 'Rank niceName',
  })
  public niceName: string;

  @Prop()
  @ApiProperty({
    description: 'Rank niceName',
    type: 'Date',
    default: '2023-10-24T17:44:22.000Z',
  })
  public lastUpdate: Date;
}

export const rankTranslationsToSchema =
  SchemaFactory.createForClass(RankTranslationsTo);
