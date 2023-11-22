import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import LastLogin from '../lastlogin.schema';

@Schema({ _id: false })
export class CmsHistory {
  @Prop()
  @ApiProperty({
    description: 'User CMS History registration ',
    type: 'Date',
    default: '2023-10-24',
  })
  public registration: Date;

  @Prop({ default: null })
  @ApiProperty({
    description: 'User CMS unregistration date',
    type: 'Date',
    default: '2023-10-24',
  })
  public unregistration: Date;

  @Prop({ type: LastLogin, default: {} })
  @ApiProperty({
    description: 'User CMS History Last Login',
    type: () => LastLogin,
  })
  public lastLoginCMS: LastLogin;
}
