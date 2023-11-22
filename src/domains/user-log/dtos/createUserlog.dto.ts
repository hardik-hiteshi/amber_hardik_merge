import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import logtypes from 'src/common/elements/logtypes';
export class CreateUserLogDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User Log user',
    type: 'String',
    default: 'User Display Name',
  })
  public user?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'user Log User-Agent',
    type: 'String',
    default: 'User-Agent',
  })
  public agent?: string;

  @IsOptional()
  @IsString()
  @IsEnum(logtypes)
  @ApiProperty({
    description: 'User Log type',
    type: 'String',
    enum: logtypes,
    default: 'recipe/cooked',
  })
  public type?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User Log legal term accepted',
    type: 'String',
    default: 'newsletterConditios',
  })
  public legalType?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User log user_niceName',
    type: 'String',
    default: 'user_nicename',
  })
  public niceName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'user Log IP',
    type: 'String',
    default: '192.168.1.1',
  })
  public ip?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User Log machine serial number',
    type: 'String',
    default: '14157DC1043904',
  })
  public machine?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'User Log date created',
    type: 'Date',
    default: '2023-10-24T17:44:22:222Z',
  })
  public date?: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'User Log rate done by the user',
    type: 'String',
    default: '5',
  })
  public rate?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User Log comment id in the recipe',
    type: 'String',
    default: '12',
  })
  public commentId?: string;
}
