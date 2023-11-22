// import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CheckPassword } from 'src/common/config/wordPressHasher/hash';
import { CmsUserRepository } from '../cmsUser/repository/cmsUser.repository';
import { CommonService } from 'src/common/services/common.service';
import { JwtService } from '@nestjs/jwt';
import { RecursivePartial } from 'src/common/interface';
import { Request } from 'express';
import { SignInUserDto } from './dtos';
import { User } from '../user/schema/user.schema';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  public constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository,
    private cmsUserRepo: CmsUserRepository,
    private commonService: CommonService,
  ) {}

  public async signIn(
    body: SignInUserDto,
    agent: string,
    region: string,
    request: Request,
    ip?: string,
    // redirect?: string,
    // forwarded?: string,
    // date?: Date,
    // rate?: number,
    // commentId?: string,
    // legalType?: string,
  ): Promise<object> {
    this.logger.log(`${request.method} ${request.url} in region ${region}`);
    const reigonArray = ['test-cmsdrive', 'cmsdrive'];
    let user;
    region = region.toLowerCase();

    if (reigonArray.includes(region)) {
      region = 'CMSMYCOOK';
      //if the region is in region Array, then finding the user in cmsUser Collection
      user = await this.cmsUserRepo.findOne({
        region: region.toUpperCase(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        $or: [{ login: body.login }, { 'contact.mail': body.login }],
      });
    } else {
      user = await this.userRepo.findOne({
        region: region.toUpperCase(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        $or: [{ login: body.login }, { 'contact.mail': body.login }],
      });
    }
    if (!user) throw new BadRequestException('invalid user');

    // const pwMatched = await bcrypt.compare(body.password, user.password);
    const pwMatched = await CheckPassword(body.password, user.password);
    if (!pwMatched) throw new BadRequestException('invalid password');

    request['user'] = user;

    const payload = {
      niceName: user.niceName,
      displayName: user.name ? user.name.displayName : '',
      email: user.contact.mail ? user.contact.mail : '',
      rank: user.rank,
      ip,
      role: user.role,
      allowedRegions: user.allowedRegions,
    };

    const token = await this.signJwt(payload);
    const response = {
      token,
      niceName: user.niceName,
      displayName: user.name.displayName,
      email: user.contact.mail,
      allowedRegions: user.allowedRegions,
      role: user.role,
    };

    //Starts Updating user login history========================================='

    //const { geo, ip: geoip } = await this.commonService.getGeos(request, ip);
    /*
    user.history.lastLoginCMS = {
      date: new Date(),
      ip: geoip,
      userAgent: request.headers['user-agent'],
      geo: {
        lat: geo ? geo.ll[0] : 'UNKNOWN',
        lng: geo ? geo.ll[1] : 'UNKNOWN',
      },
    };*/

    const userQuery: RecursivePartial<User> = {
      niceName: user.niceName,
      region: region.toUpperCase(),
    };

    await this.userRepo.findOneAndUpdate(userQuery, user);

    //Ends Updating user login history========================================='

    //Starts add Cms Login User Log========================================='
    // const loginLog = {
    //   agent: request.headers['user-agent'],
    //   type: 'cmsuser/login',
    // };

    /*
    await this.commonService.addUserLog(
      loginLog,
      request,
      ip,
      region,
      redirect,
      forwarded,
      date,
      rate,
      commentId,
      legalType,
    );*/

    //Ends add Cms Login User Log==========================================='

    //Check response:

    // if (response.role === 'user') {
    //   delete response.allowedRegions;
    // }

    return response;
  }

  public async signJwt(data: object, expiresIn?: string): Promise<string> {
    // const payload = {
    //   sub: id,
    // };
    const token = await this.jwtService.signAsync(data, {
      secret: 'prod_secret',
      //secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: expiresIn ?? '24h',
    });

    return token;
  }
}
