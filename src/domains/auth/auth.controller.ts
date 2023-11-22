import { ApiHeader, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SignInUserDto } from './dtos';

@Controller()
@ApiTags('Auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiHeader({
    name: 'x-redirector-ip',
    required: false,
  })
  @ApiHeader({
    name: 'x-forwarded-for',
    required: false,
  })
  @ApiHeader({
    name: 'date',
    required: false,
  })
  @ApiHeader({
    name: 'rate',
    required: false,
  })
  @ApiHeader({
    name: 'commentId',
    required: false,
  })
  @ApiHeader({
    name: 'legalType',
    required: false,
  })
  private signIn(
    // @Headers('x-redirector-ip') redirect?: string,
    // @Headers('x-forwarded-for') forwarded?: string,
    // @Headers('date') date?: Date,
    // @Headers('rate') rate?: number,
    // @Headers('commentId') commentId?: string,
    // @Headers('legalType') legalType?: string,
    @Req() request: Request,
    @Body() body: SignInUserDto,
    @Headers('User-agent') agent: string,
    @Headers('region') region: string,
    @Ip() ip: string,
  ): Promise<object> {
    return this.authService.signIn(
      body,
      agent,
      region,
      request,
      ip,
      // redirect,
      // forwarded,
      // date,
      // rate,
      // commentId,
      // legalType,
    );
  }
}
