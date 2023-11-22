import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { RankTranslationsFrom } from './from.subSchema';
import { RankTranslationsTo } from './to.subSchema';

export type RankTranslationsDocument = HydratedDocument<RankTranslations>;

@Schema({ _id: false })
export class RankTranslations {
  @Prop(RankTranslationsFrom)
  @ApiProperty({
    description: 'Rank translations From',
    type: () => RankTranslationsFrom,
  })
  public from: RankTranslationsFrom;

  @Prop([RankTranslationsTo])
  @ApiProperty({
    description: 'Rank translations To ',
    type: () => RankTranslationsTo,
  })
  public to: RankTranslationsTo[];

  @Prop()
  @ApiProperty({
    description: 'Rank do not override',
    type: 'Boolean',
    default: true,
  })
  public preserve: boolean;
}

export const rankTranslationsSchema =
  SchemaFactory.createForClass(RankTranslations);
