import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import logtypes from '../../../common/elements/logtypes';
import regions from 'src/common/enum/region.enum';

export type UserLogDocument = HydratedDocument<UserLog>;

@Schema()
export class UserLog {
  @Prop({ ref: 'User' })
  @ApiProperty({
    description: 'User Log user',
    type: 'String',
    default: 'User Display Name',
  })
  public user?: string;

  @Prop()
  @ApiProperty({
    description: 'user Log User-Agent',
    type: 'String',
    default: 'User-Agent',
  })
  public agent?: string;

  @Prop({ enum: logtypes })
  @ApiProperty({
    description: 'User Log type',
    type: 'String',
    enum: logtypes,
    default: 'recipe/cooked',
  })
  public type: string;

  @Prop()
  @ApiProperty({
    description: 'User Log legal term accepted',
    type: 'String',
    default: 'newsletterConditios',
  })
  public legalType?: string;

  @Prop()
  @ApiProperty({
    description: 'User log user_niceName',
    type: 'String',
    default: 'user_nicename',
  })
  public niceName?: string;

  @Prop()
  @ApiProperty({
    description: 'user Log IP',
    type: 'String',
    default: '192.168.1.1',
  })
  public ip?: string;

  @Prop()
  @ApiProperty({
    description: 'User Log machine serial number',
    type: 'String',
    default: '14157DC1043904',
  })
  public machine?: string;

  @Prop()
  @ApiProperty({
    description: 'User Log date created',
    type: 'Date',
    default: '2023-10-24T17:44:22:222Z',
  })
  public date?: Date;

  @Prop()
  @ApiProperty({
    description: 'User Log rate done by the user',
    type: 'String',
    default: '5',
  })
  public rate?: number;

  @Prop()
  @ApiProperty({
    description: 'User Log comment id in the recipe',
    type: 'String',
    default: '12',
  })
  public commentId?: string;

  @Prop({ required: true, enum: regions })
  @ApiProperty({
    description: 'User Log region where the user has made the acction',
    type: 'String',
    default: 'ES-TEST',
  })
  public region: string;
}

export const userLogSchema = SchemaFactory.createForClass(UserLog);
