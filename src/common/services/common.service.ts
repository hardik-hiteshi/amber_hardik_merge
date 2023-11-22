/* eslint-disable indent */
/* eslint-disable @typescript-eslint/naming-convention */
import * as express from 'express';
import * as fs from 'fs';
import * as ipInt from 'ip-to-int';
import * as moment from 'moment';
import * as path from 'path';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Document } from 'mongoose';
import { FeaturedRepository } from 'src/domains/featured/repository/featured.repository';
import { GeoLocationService } from 'src/domains/geoLocation/geoLocation.service';
import { RecipeDocument } from 'src/domains/recipe/schema/recipe.schema';
import { RecipeRepository } from 'src/domains/recipe/repository/recipe.repository';
import { Request } from 'express';
import { UserDocument } from 'src/domains/user/schema/user.schema';
import { UserLogService } from 'src/domains/user-log/user-log.service';

@Injectable()
export class CommonService {
  public constructor(
    private configService: ConfigService,
    private geoLocationService: GeoLocationService,
    private ulServices: UserLogService,
    private recipeRepo: RecipeRepository,
    private featuredRepo: FeaturedRepository,
  ) {}

  public fileUpload(file: Array<Express.Multer.File>, type: string): object[] {
    if (!file || file.length <= 0)
      throw new BadRequestException('request must contain file');
    const baseUrl = this.configService.get('BASE_URL');
    const result = file.map((data, index) => ({
      [index]: `${baseUrl}/image/${type}/${data.filename}`,
    }));

    return result;
  }

  public isEmpty(obj: object): boolean {
    if (obj === null || obj === undefined) return true;

    if (Array.isArray(obj) && obj.length > 0) return false;
    if (Array.isArray(obj) && obj.length === 0) return true;

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

  public async getGeos(
    req: Request,
    ip: string,
  ): Promise<{
    geo: {
      ll: {
        0: string;
        1: string;
      };
    };
    ip: string;
  }> {
    const publicIP = '147.83.113.200';
    ip = ip.replace('::ffff:', '');

    // Avoid geo-ipeing localhost :)
    if (ip == '127.0.0.1' || ip.startsWith('192.168.')) {
      ip = publicIP;
    }

    if (ip == '::1') {
      ip = publicIP;
    }

    const ip_int = ipInt(ip).toInt();

    let geo = {
      ll: {
        0: '1',
        1: '1',
      },
    };

    const query = {
      $and: [
        { network_start_ip: { $lte: ip_int } },
        { network_last_ip: { $gte: ip_int } },
      ],
    };

    if (ip_int !== 'undefined' || ip_int !== null) {
      const coor = await this.geoLocationService.getGeoLocation(query);

      if (coor) {
        geo = {
          ll: {
            0: coor.latitude,
            1: coor.longitude,
          },
        };
      } else {
        throw new NotFoundException(
          'No latitude for this IP in Mongo database',
        );
      }
    } else {
      throw new NotFoundException('No latitude for this IP in Mongo database');
    }

    return { geo, ip };
  }

  public async fillUserLog(
    incomingUserLog: object,
    req: Request,
    ip: string,
  ): Promise<object> {
    if (req['user'] && req['user']['role'] == 'machine') {
      incomingUserLog['machine'] = req['user']['serial'];
    } else {
      // if (!incomingUserLog['user']) {
      //   incomingUserLog['user'] = _.get(req, 'user.niceName', 'anonymous');
      // }
      // if (!incomingUserLog['machine']) {
      //   incomingUserLog['machine'] = _.get(req, 'user.machine', undefined);
      // }

      if (!incomingUserLog['user']) {
        incomingUserLog['user'] = this.getProp(
          req,
          'user.niceName',
          'anonymous',
        );
      }
      if (!incomingUserLog['machine']) {
        incomingUserLog['machine'] = this.getProp(
          req,
          'user.machine',
          undefined,
        );
      }
    }

    if (!incomingUserLog['date'] || this.isEmpty(incomingUserLog['date'])) {
      incomingUserLog['date'] = new Date();
    } else {
      incomingUserLog['date'] = new Date(incomingUserLog['date']);
    }
    incomingUserLog['ip'] = ip;

    if (req['region'] && req['region'] != '') {
      incomingUserLog['region'] = req['region'];
    }

    return incomingUserLog;
  }

  public async addUserLog(
    incomingUserLog: object,
    req: Request,
    ip: string,
    region: string,
    redirect?: string,
    forwarded?: string,
    date?: Date,
    rate?: number,
    commentId?: string,
    legalType?: string,
  ): Promise<void> {
    incomingUserLog = await this.fillUserLog(incomingUserLog, req, ip);

    const newUserLog = await this.ulServices.createIncomingUserLog(
      req['user'],
      req.headers['user-agent'],
      region,
      ip,
      redirect,
      forwarded,
      date,
      rate,
      commentId,
      legalType,
      incomingUserLog,
    );
    if (!newUserLog['type']) {
      throw new BadRequestException('Userlog without type. LOG:');
      //log.error('Userlog without type. LOG:', incomingUserLog);
    }
  }
  public async updateUserLog(
    incomingUserLog,
    req: express.Request,
    last: string,
  ): Promise<void> {
    incomingUserLog = this.fillUserLog(incomingUserLog, req, req.ip);
    const query = structuredClone(incomingUserLog);

    query.niceName = last;
    query.date = { $gte: moment(query.date).subtract(5, 'minutes').toDate() };

    if (!incomingUserLog.type) {
      console.error('Userlog without type. LOG:', incomingUserLog);
    }

    await this.ulServices.updateUserLog(query, incomingUserLog);
  }
  public getAdminRoles(): string[] {
    return ['admin', 'superadmin'];
  }

  public async getRecipesCounter(
    region: string,
    niceName: string,
  ): Promise<number> {
    const query = {
      region,
      'user.niceName': niceName,
      'grants.view': {
        $not: {
          $in: ['user/' + niceName, 'draft/' + niceName, 'deleted/user'],
        },
      },
    };
    const docCount = await this.recipeRepo.count(query);

    return docCount;
  }

  public async filterStatus(
    recipe: RecipeDocument,
    user?: UserDocument,
  ): Promise<RecipeDocument> {
    if (recipe.status) {
      if (user) {
        const isMine = user.niceName == recipe.user['niceName'];
        if (user.favorites) {
          const isFavorite = user.favorites.indexOf(recipe.niceName) > -1;
          recipe.status['favorite'] = isFavorite;
        }
        if (user.todo) {
          const isTodo = user.todo.indexOf(recipe.niceName) > -1;
          recipe.status['todo'] = isTodo;
        }
        recipe.status['rated'] = this.checkIsRated(recipe, user);
        recipe.status['mine'] = isMine;
      } else {
        recipe.status['rated'] = false;
        recipe.status['mine'] = false;
        recipe.status['favorite'] = false;
        recipe.status['todo'] = false;
      }

      if (recipe.grants && recipe.grants.view) {
        const userPrivateGrants = recipe.grants.view.filter(
          (val) => val && val.startsWith('user/'),
        );

        const userDraftGrants = recipe.grants.view.filter(
          (val) => val && val.startsWith('draft/'),
        );

        const userDeletedGrants = recipe.grants.view.filter(
          (val) => val && val.startsWith('deleted/'),
        );

        const hasPublicGrant = recipe.grants.view.indexOf('public') > -1;

        //Is private if the recipe does not contain the grant public and has a grant starting with user/
        recipe.status['private'] =
          userPrivateGrants.length > 0 && !hasPublicGrant;
        recipe.status['draft'] = userDraftGrants.length > 0 && !hasPublicGrant;

        //Recipe needs payment if the recipe does not contain the grant public and has not a grant starting with user/
        recipe.status['ppv'] =
          recipe.grants.view.length > 0 &&
          userPrivateGrants.length == 0 &&
          userDraftGrants.length == 0 &&
          userDeletedGrants.length == 0 &&
          !hasPublicGrant;

        recipe.status['canView'] = true;
        if (user) {
          if (
            recipe.grants &&
            recipe.grants.view &&
            recipe.grants.view instanceof Array &&
            recipe.grants.view.length > 0
          ) {
            user.grants = user.grants || [];
            user.grants.push('public');
            user.grants.push('user/' + user.niceName);
            user.grants.push('draft/' + user.niceName); //draft grant
            if (this.intersect(recipe.grants.view, user.grants).length == 0) {
              recipe.status['canView'] = false;
            }
          }
          if (
            user.role &&
            (user.role == 'admin' || user.role == 'superadmin')
          ) {
            recipe.status['canView'] = true;
          }
        } else {
          if (recipe.status['ppv']) {
            recipe.status['canView'] = false;
            recipe.groups = undefined;
          }

          if (recipe.status['private']) {
            recipe.status['canView'] = false;
          }

          if (recipe.status['draft']) {
            recipe.status['canView'] = false;
          }
        }

        //JUAN. Parece que al estar en todo se volvian visibles.
        // no tiene sentido. if((recipe.status.ppv || recipe.status.private)
        //&& !recipe.status.todo && !recipe.status.canView) {
        if (
          (recipe.status['ppv'] ||
            recipe.status['private'] ||
            recipe.status['draft']) &&
          !recipe.status['canView']
        ) {
          // recipe.groups = undefined;
        } else {
          recipe.status['canView'] = true;
        }
        recipe.status['featured'] = await this.getFeatured(recipe);
      } else {
        recipe.status['private'] = false;
        recipe.status['ppv'] = false;
        recipe.status['canView'] = true;
      }
    }

    return recipe;
  }

  public async getFeatured(recipe: RecipeDocument): Promise<boolean> {
    let cacheFeatured;
    let lastTime;
    try {
      const t = Date.now() - lastTime;
      if (cacheFeatured == null || t > 3600) {
        lastTime = Date.now();
        const r = await this.featuredRepo.findAll();
        if (r.length > 0) {
          r.forEach((recipe) => {
            if (!cacheFeatured[recipe.region]) {
              cacheFeatured[recipe.region] = [];
            }
            cacheFeatured[recipe.region].push(...recipe.featuredRecipes);
          });
        } else {
          //log.error("No featured in Mongo database");
          return false;
        }
      }
    } catch (e) {
      console.error(`ERROR IN GET FEATURED ${e}`);

      return false;
    }

    return cacheFeatured[recipe.region]
      ? cacheFeatured[recipe.region].indexOf(recipe.niceName) != -1
      : false;
  }

  public intersect(
    array1: Array<unknown>,
    array2: Array<unknown>,
  ): Array<unknown> {
    const result = [];

    for (const e in array1) {
      if (array2.indexOf(array1[e]) > -1) {
        result.push(array1[e]);
      }
    }

    return result;
  }

  public checkIsRated(recipe: RecipeDocument, user: UserDocument): boolean {
    if (!recipe.ratings) {
      return undefined;
    }
    for (const rating of recipe.ratings) {
      if (rating.niceName == user.niceName) {
        return true;
      }
    }

    return false;
  }
  public isAdminRole(role: string): boolean {
    return role ? this.getAdminRoles().indexOf(role) > -1 : false;
  }

  public addNutritionalColor(recipe: RecipeDocument): object {
    const nutritionalColor = {};
    // nutritionalColor.legend = addLegend();
    if (
      recipe &&
      recipe.nutritional &&
      recipe.nutritional.Energy &&
      recipe.nutritional.Energy.value
    ) {
      nutritionalColor['kcal'] = {};
      const kcalValue = recipe.nutritional.Energy.value;
      if (kcalValue >= 600) {
        nutritionalColor['kcal'].color = 'Red';
      }
      if (kcalValue < 600 && kcalValue >= 300) {
        nutritionalColor['kcal'].color = 'Yellow';
      }
      if (kcalValue < 300) {
        nutritionalColor['kcal'].color = 'Green';
      }

      nutritionalColor['kcal'].percent = (kcalValue / 2000) * 100;
    }

    return nutritionalColor;
  }

  public prune(
    doc: RecipeDocument[] | RecipeDocument,
  ): RecipeDocument[] | RecipeDocument {
    if (Array.isArray(doc)) {
      doc = doc.filter((val) => val !== undefined && val !== null);

      doc.forEach((elem, index) => {
        doc[index] = this.prune(elem);
      });
    } else if (
      doc &&
      doc !== null &&
      doc !== undefined &&
      typeof doc === 'object'
    ) {
      if (doc.toObject) {
        const objDoc = doc.toObject();
        if (typeof objDoc === 'object' && objDoc !== null) {
          if (Object.keys(objDoc).length > 0) {
            for (const i in objDoc) {
              doc[i] = this.prune(doc[i]);
            }
          } else {
            if (objDoc === null) {
              doc = undefined;
            }
          }
        }
      } else {
        if (Object.keys(doc).length > 0) {
          for (const i in doc) {
            doc[i] = this.prune(doc[i]);
          }
        }
      }
    } else {
      if (doc === null) {
        doc = undefined;
      }
    }

    return doc;
  }

  public config(): object {
    let config = null;
    if (config == null) {
      const localEnv = 'test-85';
      const nodeEnv = process.env.NODE_ENV || localEnv;

      let envPath: string;

      if (nodeEnv === localEnv) {
        envPath = path.join(process.cwd(), '/src/config/env.json');
      } else {
        envPath = path.join(process.cwd(), '/config/env.json');
      }

      const env = JSON.parse(fs.readFileSync(envPath, 'utf8'));
      const result = env[nodeEnv];

      if (result == null) {
        throw 'Environment configuration not found!';
      }
      config = result;
    }

    return config;
  }

  public getDefaultElasticIndex(region: string): string {
    return 'recipes_' + region.toLowerCase().replace(/-/g, '_');
  }

  public setProp(o: object, key: string, value: unknown): void {
    const res = o[key];
    if (res != undefined) {
      o[key] = value;

      return;
    }
    let tmp = key;
    do {
      const p = this.splitLastLevel(tmp);
      const ref = this.getProp(o, p.path);
      if (ref != undefined) {
        ref[p.key] = value;

        return;
      }
      tmp = p.path;
    } while (tmp != '');
    o[key] = value;
  }

  public getProp(
    obj: object,
    key: string,
    defaultValue?: string,
  ): object | string {
    const res = obj[key];
    if (res != undefined) return res;
    const props = key.split('.'); // Split the string by '.'

    let value = obj;
    for (const prop of props) {
      if (/\[\d+\]/.test(prop)) {
        // If the property includes an array accessor
        const [key, index] = prop.split(/\[|\]/).filter(Boolean); // Extract the key and index
        value = value[key][index]; // Access the array element
      } else {
        value = value[prop]; // Access the object property
      }
    }
    if (defaultValue && !value) {
      return defaultValue;
    }

    return value;
  }

  public equalArrays(array1: Array<object>, array2: Array<object>): boolean {
    if (array1.length != array2.length) return false;

    for (const e in array1) {
      if (array1[e] != array2[e]) return false;
    }

    return true;
  }

  public putProps(
    doc: Document,
    incomingValues: object,
    unmutableKeys: string[],
  ): void {
    unmutableKeys = unmutableKeys || [];
    Object.keys(incomingValues).forEach((key) => {
      const newValue = incomingValues[key];
      if (unmutableKeys.indexOf(key) == -1) {
        this.setProp(doc, key, newValue);
        doc.markModified(key);
      }
    });
  }

  public splitLastLevel(path: string): { path: string; key: string } {
    const i = path.lastIndexOf('.');
    if (i == -1) return { path: '', key: path };

    return { path: path.substring(0, i), key: path.substring(i + 1) };
  }
}
