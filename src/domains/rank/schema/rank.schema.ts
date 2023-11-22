import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { RankTranslations } from './subSchema/translations/translations.subSchemas';
import regions from 'src/common/elements/regions';

export type RankDocument = HydratedDocument<Rank>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Rank {
  @Prop({ required: true })
  @ApiProperty({
    description: 'Rank name',
    type: 'String',
    default: 'Rank Display Name',
  })
  public name: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'Rank niceName',
    type: 'String',
    default: 'Rank niceName',
  })
  public niceName: string;

  @Prop({ default: '' })
  @ApiProperty({
    description: 'Rank image',
    type: 'String',
    default: '',
  })
  public image: string;

  @Prop()
  @ApiProperty({
    description: 'Rank description',
    type: 'String',
    default: 'Rank Description',
  })
  public description: string;

  @Prop({ required: true, enum: regions })
  @ApiProperty({
    description: 'Rank region',
    type: 'String',
    default: 'Es-TEST',
  })
  public region: string;

  @Prop(RankTranslations)
  @ApiProperty({
    description: 'Rank translations',
    type: () => RankTranslations,
  })
  public translations: RankTranslations;

  // @Prop({ default: true })
  // @ApiProperty({
  //   description: 'Rank visivility',
  //   type: 'Boolean',
  //   default: true,
  // })
  // public isActive: boolean;
}

export const rankSchema = SchemaFactory.createForClass(Rank);
