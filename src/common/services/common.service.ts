/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/naming-convention */
import * as fs from 'fs';
import * as path from 'path';

import * as _ from 'lodash';
import * as ipInt from 'ip-to-int';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Document, Model } from 'mongoose';
import {
  Recipe,
  RecipeDocument,
} from 'src/domains/recipe/schema/recipe.schema';
import Elastic from '.././singletons/elastic/elastic';

import { Category } from 'src/domains/category/schema/category.schema';
import { CategoryRepository } from 'src/domains/category/repository/category.repository';
import { ConfigService } from '@nestjs/config';
import { FeaturedRepository } from 'src/domains/featured/repository/featured.repository';
import { filterRules } from '../filters/recipe/defaultFilter';
import { GeoLocationService } from 'src/domains/geoLocation/geoLocation.service';
import { RecipeRepository } from 'src/domains/recipe/repository/recipe.repository';
import regions from '../../config/keys.json';
import { Request } from 'express';
import { UserDocument } from 'src/domains/user/schema/user.schema';
import { UserLogService } from 'src/domains/user-log/user-log.service';
import { UserRepository } from 'src/domains/user/repository/user.repository';
interface Regions {
  [key: string]: string;
}
@Injectable()
export class CommonService {
  private readonly superAdminRegion: string = '';
  private readonly superAdminModes: string[] = [
    'outside_development',
    'development',
    'console',
  ];
  public constructor(
    private configService: ConfigService,
    private geoLocationService: GeoLocationService,
    private userLogServices: UserLogService,
    private recipeRepo: RecipeRepository,
    private userRepo: UserRepository,
    private featuredRepo: FeaturedRepository,
    private categoryRepo: CategoryRepository,
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
      if (!incomingUserLog['user']) {
        incomingUserLog['user'] = _.get(req, 'user.niceName', 'anonymous');
      }
      if (!incomingUserLog['machine']) {
        incomingUserLog['machine'] = _.get(req, 'user.machine', undefined);
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

    const newUserLog = await this.userLogServices.createIncomingUserLog(
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

  public async searchAndPaginate<T>(
    region: string,
    req: Request,
    model: Model<Document>,
    where: object,
    profileFilter: object,
    options: object,
  ): Promise<object> {
    let favorites: string[] = [];
    let user: UserDocument | null = null;
    let response;
    if (model instanceof Recipe && req['user'] !== undefined) {
      const resUser = await this.userRepo.findOne(
        { niceName: req['user']['niceName'], region },
        {},
      );

      if (resUser !== null) {
        favorites = resUser.favorites;
        user = resUser;
      }

      response = await this.process(
        req,
        region,
        where,
        profileFilter,
        options,
        model,
        user,
      );

      return response;
    }

    response = await this.process(
      req,
      region,
      where,
      profileFilter,
      options,
      model,
      user,
    );

    return response;
  }

  public async process(
    req: Request,
    region: string,
    where: object,
    profileFilter: object,
    options: object,
    model: Model<Document>,
    user: UserDocument,
  ): Promise<object> {
    if (region !== '') where['region'] = region;

    if (where['$text']) {
      if (where['$text']['$search']) {
        where['$text']['$search'] = where['$text']['$search'].replace(
          '%20',
          ' ',
        );
      }

      if (profileFilter) {
        const tmp = `{${Object.keys(profileFilter)
          .map((key) => `"${key}":1`)
          .join(',')}}`;
        profileFilter = JSON.parse(tmp);
      }

      profileFilter['score'] = { $meta: 'textScore' };

      if (options['sort']) {
        options['sort']['score'] = { $meta: 'textScore' };
      } else {
        options['sort'] = { score: { $meta: 'textScore' } };
      }
    }

    const result = await model.find(where, profileFilter, options);

    // const arrayResult = result === undefined ? [] : result;

    // const filteredElements = [];

    const processElement = async (element, model, user): Promise<Document> => {
      if (model === Recipe) {
        await this.filterStatus(user);
        await this.prune(element);

        if (
          !element.status ||
          !(element.status.private && !element.status.canView)
        ) {
          return element;
        }

        return null;
      }

      return element;
    };

    // Iterating through the 'result' array sequentially
    const arrayResult = [];
    let promises = Promise.resolve();

    result.forEach((element) => {
      promises = promises.then(async () => {
        const processedElement = await processElement(element, model, user);
        if (processedElement !== null) {
          arrayResult.push(processedElement);
        }

        return Promise.resolve();
      });
    });

    await promises;
    if (req.query.random) {
      const count = await this.getCollectionCount(model, where);

      const queryrandom = parseInt(req.query.random.toString());
      const response = await this.random(
        req,
        queryrandom,
        arrayResult,
        count,
        where,
      );

      return response;
    }

    const countData = await this.getCollectionCount(model, where);

    const cat = req.query.category;
    let category;
    if (cat) {
      category =
        cat == undefined ? where['categoryNiceName'] : req.query.category;
    }
    const response = await this.getCount(category, arrayResult, countData);

    return response;
  }

  public async getNameFromNiceName(model, niceName): Promise<string> {
    try {
      const result = await model.findOne({ niceName }, { name: 1 });

      return result ? result.name : '';
    } catch (error) {
      console.error(error);
      throw error;
    }
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

        if (
          (recipe.status['ppv'] ||
            recipe.status['private'] ||
            recipe.status['draft']) &&
          !recipe.status['canView']
        ) {
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
          cacheFeatured = _.mapValues(_.keyBy(r, 'region'), 'featuredRecipes');
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

  public async prune(
    doc: RecipeDocument[] | RecipeDocument,
  ): Promise<RecipeDocument[] | RecipeDocument> {
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

  public async getCollectionCount(
    model: Model<Document>,
    where: object,
  ): Promise<number> {
    try {
      const count = await model.countDocuments(where).exec();

      return count;
    } catch (error) {
      throw new Error(`Error in counting documents: ${error.message}`);
    }
  }

  public async random(
    req: Request,
    queryrandom: number,
    arrayResult,
    count: number,
    where: object,
  ): Promise<object> {
    const resCount = arrayResult.length;
    if (req.query.random) {
      const randomResult = [];
      // eslint-disable-next-line no-var
      for (var i = 0; i < parseInt(req.query.random.toString()); i++) {
        const rand = Math.floor(Math.random() * resCount);
        randomResult.push(arrayResult[rand]);
      }

      const returnStatus = {
        status: { count },
        result: randomResult,
      };

      return returnStatus;
    }

    const cat = req.query.category;
    if (cat) {
      const category =
        cat == undefined ? where['categoryNiceName'] : req.query.category;

      const response = await this.getCount(category, arrayResult, count);

      return response;
    }
  }

  public async getCount(cat, arrayResult, count: number): Promise<object> {
    const setStatus = {
      status: { count },
      result: arrayResult,
    };

    //In the future it will be deprecated req.query.category != undefined (GET recipes disabled)
    //const category = cat == undefined ? where.categoryNiceName : cat;

    if (cat != undefined) {
      const name = this.getNameFromNiceName(Model<Category>, cat);
      if (name) {
        setStatus['status']['title'] = name;
      }

      return setStatus;
    }

    return setStatus;
  }

  public isValidRegion(region: string, regions: Regions): boolean {
    return regions[region] !== undefined;
  }

  public mapRegion(region: string, config): string | undefined {
    const { regions, mode } = config;

    if (this.isValidRegion(region, regions)) {
      const r = regions[region];

      if (regions && regions[r]) {
        return r;
      } else if (mode === 'console') {
        return r;
      }

      return this.checkGrants(config);
    }

    return this.checkGrants(config);
  }

  public checkGrants(config): string | undefined {
    if (this.superAdminModes.indexOf(config.mode) !== -1) {
      return this.superAdminRegion;
    }

    // return undefined;
    return 'ES-TEST';
  }

  public getRegionFromUrlAndContinue(req: Request, config): void {
    const host = req.headers.host as string;
    const values = host.split('.');
    req['region'] = this.mapRegion(values[0], config);

    if (!req['region']) {
      throw new HttpException('Invalid region', HttpStatus.UNAUTHORIZED);
    }
  }

  public async getRegion(req: Request, config): Promise<void> {
    const myCookRegion = req.headers['mycook-region'];

    if (myCookRegion) {
      req['region'] = myCookRegion;
    } else {
      this.getRegionFromUrlAndContinue(req, config);
    }
  }

  public async config(): Promise<object> {
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

  public async getDefaultElasticIndex(region: string): Promise<string> {
    return `recipes_${region.toLowerCase().replace(/-/g, '_')}`;
  }

  public async escapeTerm(term: string): Promise<string> {
    return term
      .replace(/\\/g, '\\')
      .replace(/\(/g, '\\(')
      .replace(/\[/g, '\\[')
      .replace(/\+/g, '\\+')
      .replace(/\-/g, '\\-')
      .replace(/\=/g, '\\=')
      .replace(/\&/g, '\\&')
      .replace(/\|/g, '\\|')
      .replace(/\>/g, '\\>')
      .replace(/\</g, '\\<')
      .replace(/\)/g, '\\)')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/\"/g, '\\"')
      .replace(/\~/g, '\\~')
      .replace(/\*/g, '\\*')
      .replace(/\?/g, '\\?')
      .replace(/\:/g, '\\:')
      .replace(/\//g, '\\/')
      .replace(/\!/g, '\\!');
  }

  public async querySorting(req: Request, esQuery): Promise<Array<unknown>> {
    // eslint-disable-next-line prefer-const
    let esSort = esQuery['sort'];

    if (req.query.sortBy !== undefined) {
      const order = req.query.order === 'ascendant' ? 'asc' : 'desc';

      esSort.push({ _score: { order: 'desc' } });

      switch (req.query.sortBy) {
        case 'voted':
          esSort.push({ 'social.facebook': { order, unmapped_type: 'long' } });
          break;
        case 'commented':
          esSort.push({ 'social.comments': { order, unmapped_type: 'long' } });
          break;
        case 'favorites':
          esSort.push({ 'social.favorite': { order, unmapped_type: 'long' } });
          break;
        case 'recent':
          esSort.push({
            'info.creationDate': { order, unmapped_type: 'long' },
          });
          break;
        case 'rate':
          esSort.push({ rate: { order, unmapped_type: 'long' } });
          esSort.push({ 'social.ratings': { order, unmapped_type: 'long' } });
          break;
        case 'title':
          esSort.push({ 'title.keyword': { order, unmapped_type: 'long' } });
          break;
      }
    } else {
      esSort.push({ _score: { order: 'desc' } });
    }

    return { ...esQuery, sort: esSort };
  }

  public queryParamsText(req: Request, esQuery): Promise<object> {
    let esShould = esQuery['query']['bool']['should'];
    let cerca = req.params.query
      ? req.params.query
          .trim()
          .replace('.*', ' ')
          .replace(/\+/g, ' ')
          .split(' ')
          .filter((term) => term !== '')
          .join(' ')
      : null;

    if (cerca) {
      let words = cerca
        .split(' ')
        .map((word) => this.escapeTerm(word))
        .filter((t) => t);

      let fieldsArray = req.body.ingredients
        ? ['title.tokens', 'user.displayName', 'user.niceName']
        : [
            'title.tokens^3',
            'user.displayName',
            'user.niceName',
            'groups.steps.ingredients.name.tokens',
          ];

      esShould.push({
        multi_match: {
          query: this.escapeTerm(cerca),
          type: 'phrase',
          fields: fieldsArray,
        },
      });

      esShould.push({
        multi_match: {
          query: this.escapeTerm(words.join(' ')),
          type: 'cross_fields',
          fields: fieldsArray,
          operator: 'AND',
        },
      });

      for (let word of words) {
        esShould.push({
          multi_match: {
            query: word,
            type: 'best_fields',
            fields: fieldsArray,
            fuzziness: 'AUTO:3,9',
          },
        });
      }

      esQuery['query']['bool'].minimum_should_match = '50%';
    }

    return esQuery;
  }

  public isS1(userAgent): boolean {
    const touch1 = ['Innochef Touch', 'Mycook Touch', "i-Cook'in"];

    return touch1.find((t1) => userAgent.startsWith(t1)) ? true : false;
  }

  public queryCommonFields(req: Request): object {
    console.log('profile', typeof req.query.profile);
    console.log(
      'filterRules.readFilter[profile]',
      filterRules.readFilter[req.query.profile as string],
    );

    const esQuery = {
      from: req.query.skip || 0,
      size: req.query.limit || 10,
      _source: {
        includes: filterRules.readFilter[req.query.profile as string],
        //.split(' '),
      },
      query: {
        bool: {
          must: [],
          must_not: [],
          filter: [],
          should: [],
        },
      },
      sort: [],
    };

    const esFilter = esQuery['query']['bool']['filter'];
    const esMustNot = esQuery['query']['bool']['must_not'];

    esFilter.push({
      term: { 'region.keyword': req['region'] },
    });

    esMustNot.push({ term: { 'grants.search.keyword': 'multisize' } });

    let format;

    if (this.isS1(req.headers['user-agent'])) {
      format = 'S1';
    } else if (req.body['compatibility.current']) {
      format = req.body['compatibility.current'];
    }

    if (format) {
      if (Array.isArray(format)) {
        esFilter.push({
          terms: { 'compatibility.current.keyword': format },
        });
      } else if (typeof format === 'string') {
        esFilter.push({
          term: { 'compatibility.current.keyword': format },
        });
      } else if (typeof format === 'object') {
        esFilter.push({
          term: { 'grants.search.keyword': 'main' },
        });
      }
    } else {
      esFilter.push({
        term: { 'grants.search.keyword': 'main' },
      });
    }

    return esQuery;
  }

  public mongoToElastic(req: Request, esQuery): void {
    const esFilter = esQuery['query']['bool']['filter'];
    const esMust = esQuery['query']['bool']['must'];
    const esMustNot = esQuery['query']['bool']['must_not'];

    const ignoreFields = [
      'status.mine',
      'status.favorites',
      'status.draft',
      'status.mine',
      'status.todo',
      'status.done',
      'status.idParent',
    ];

    const translateKey = (key: string): string => {
      switch (key) {
        case 'categoryNiceName':
        case 'categories.niceName':
          return 'categories.niceName.keyword';
        case 'tags':
          return 'tags.keyword';
        case 'ingredients':
          return 'groups.steps.ingredients.name.tokens';
        case 'user.niceName':
          return 'user.niceName.keyword';
        case 'course':
          return 'course.keyword';
        case 'compatibility.current':
          return 'compatibility.current.keyword';
        default:
          return key;
      }
    };

    for (let key of Object.keys(req.body)) {
      if (!ignoreFields.includes(key)) {
        let value = req.body[key];

        if (value.constructor.name == 'Object') {
          let mongoOperators = Object.keys(value);
          let activeRange = null;

          for (let operator of mongoOperators) {
            let terms = {};

            switch (operator) {
              case '$in' /* Categories, ingredients */:
                let translatedKey = translateKey(key);

                if (translatedKey.includes('keyword')) {
                  terms[translatedKey] =
                    value[
                      operator
                    ]; /* Must be an array of niceNames (not escaped), "logical OR" */
                  esFilter.push({ terms });
                } else {
                  esMust.push(
                    ...value[operator].map((v) => {
                      let match = {};
                      match[translatedKey] = this.escapeTerm(v.toLowerCase());

                      return { match };
                    }),
                  );
                }

                break;
              case '$nin' /* ingredients */:
                esMustNot.push(
                  ...value[operator].map((v) => {
                    let match = {};
                    match[translateKey(key)] = this.escapeTerm(v.toLowerCase());

                    return { match };
                  }),
                );

                break;
              case '$all' /* Tags */:
                esFilter.push(
                  ...value[operator].map((v) => {
                    let term = {};
                    term[translateKey(key)] = v;

                    return { term };
                  }),
                );

                break;
              case '$lte': /* TotalTime */
              case '$gte':
                activeRange = activeRange || { range: {} };

                if (!activeRange.range[translateKey(key)])
                  activeRange.range[translateKey(key)] = {};

                activeRange.range[translateKey(key)][operator.slice(1)] =
                  parseInt(value[operator]).toString();

                break;
              case '$ne':
                if (
                  value[operator] == null ||
                  JSON.stringify(value[operator]) == '[]'
                ) {
                  esFilter.push({ exists: { field: translateKey(key) } });
                } else {
                  let match = {};
                  match[translateKey(key)] = this.escapeTerm(value[operator]);
                  esMustNot.push({ match });
                }

                break;

              case '$not':
                /* Se usa solo para filtrar recetas con vídeo, ya se trata en $ne */
                break;

              case '$exists':
                if (value[operator]) {
                  esFilter.push({ exists: { field: translateKey(key) } });
                } else {
                  esMustNot.push({ exists: { field: translateKey(key) } });
                }
                break;

              default:
                console.error(
                  'MongoToElastic: Unknown operator => ' +
                    operator +
                    ', skipping, offending key: ' +
                    key +
                    ' offending value: ' +
                    JSON.stringify(value),
                );
            }
          }

          if (activeRange) esFilter.push(activeRange);
        } else if (value.constructor.name == 'Array') {
          if (key != 'compatibility.current') {
            esMust.push({
              query_string: {
                default_field: translateKey(key),
                query: value
                  .map((val) => '"' + this.escapeTerm(val) + '"')
                  .join(' '),
              },
            });
          }
        } else {
          if (key != 'compatibility.current') {
            let term = {};
            term[translateKey(key)] = value.toString();
            esFilter.push({ term });
          }
        }
      }
    }
  }

  public async processQuery(req: Request, user): Promise<unknown[]> {
    console.log('this.queryCommonFields(req)', this.queryCommonFields(req));

    const es_query = await this.querySorting(
      req,
      this.queryParamsText(req, this.queryCommonFields(req)),
    );

    console.log('es_query', es_query);

    let grants = ['public'];

    let es_filter = es_query['query']['bool']['filter'];
    let es_must = es_query['query']['bool']['must'];

    let query = req.body;

    this.mongoToElastic(req, es_query);
    if (user != null) {
      grants.push('user/' + req['user']['niceName']);
      grants.push('draft/' + req['user']['niceName']);

      if (req['user'].grants) grants = grants.concat(req['user'].grants);

      if (query['status.mine'] !== undefined) {
        es_filter.push({
          term: { 'user.niceName.keyword': req['user']['niceName'] },
        });
      } else if (query['status.draft'] !== undefined) {
        es_filter.push({
          term: { 'grants.view.keyword': 'draft/' + req['user']['niceName'] },
        });
      } else if (query['status.favorites'] !== undefined) {
        es_must.push({ terms: { 'niceName.keyword': user.favorites || [] } });
      } else if (query['status.todo'] !== undefined) {
        es_must.push({ terms: { 'niceName.keyword': user.todo || [] } });
      } else if (query['status.done'] !== undefined) {
        es_query['from'] = 0;
        es_query['size'] = user.done.length;

        es_must.push({
          terms: {
            'niceName.keyword': user.done.map((done) => done.niceName) || [],
          },
        });
      }
    }

    es_filter.push({
      terms: { 'grants.search.keyword': grants },
    });

    return es_query;
  }

  public getAccessoriesList(recipe): unknown {
    recipe.accesoriesList = [];

    for (let groupIndex in recipe.groups) {
      let group = recipe.groups[groupIndex];
      for (let stepIndex in group.steps) {
        let step = group.steps[stepIndex];
        let accessoriesIndex = 0;
        if (step && step.accessories) {
          for (
            accessoriesIndex = 0;
            accessoriesIndex < step.accessories.length;
            accessoriesIndex++
          ) {
            let accessory = step.accessories[accessoriesIndex];
            if (
              !this.isEmpty(accessory) &&
              recipe.accesoriesList.indexOf(accessory) == -1
            ) {
              recipe.accesoriesList.push(accessory);
            }
          }
        }
      }
    }

    return recipe;
  }

  public isValidIngredient(o): boolean {
    return (
      o.qty != undefined &&
      o.unit != undefined &&
      o.name != undefined &&
      !o.reserved
    );
  }

  public isValidQty(qty): boolean {
    return (
      !this.isEmpty(qty) && qty.indexOf('/') == -1 && !isNaN(parseFloat(qty))
    );
  }

  public filterQty(input): string {
    return !this.isEmpty(input)
      ? input.replace(',', '.').replace(' ', '')
      : input;
  }

  public getNum(numStr): number {
    return parseFloat(this.filterQty(numStr));
  }

  public indexOfObject(list, item): number {
    return _.findIndex(list, (o) => _.isEqual(item, o));
  }

  public getIngredients(recipe): unknown {
    recipe.ingredients = [];
    let allowedLiquidUnits = ['ml', 'l'];
    if (recipe.steps && recipe.steps.length > 0) {
      recipe.steps.forEach((step) => {
        let ingredients = step.ingredients;
        ingredients = _.filter(ingredients, (o) => !o.reserved);

        if (ingredients && ingredients.length > 0) {
          ingredients.forEach((originalIng) => {
            if (this.isValidIngredient(originalIng)) {
              let ing = {
                name: originalIng.name,
                qty: originalIng.qty,
                unit: originalIng.unit,
                extra: originalIng.extra || '',
              };
              if (recipe.ingredients.length > 0) {
                if (this.isValidQty(ing.qty)) {
                  let ingFound = false;
                  let j = 0;
                  while (j < recipe.ingredients.length && !ingFound) {
                    let anIng = recipe.ingredients[j];
                    // si tienen los mismos campos, se suma tal cual
                    if (
                      anIng.name == ing.name &&
                      anIng.unit == ing.unit &&
                      anIng.extra == ing.extra
                    ) {
                      anIng.qty =
                        this.getNum(anIng.qty) + this.getNum(ing.qty) + '';
                      ingFound = true;
                      // si alguno tiene de uds 'ml', 'l'
                    } else if (
                      anIng.name == ing.name &&
                      anIng.extra == ing.extra &&
                      allowedLiquidUnits.indexOf(anIng.unit) > -1 &&
                      allowedLiquidUnits.indexOf(ing.unit) > -1
                    ) {
                      // pasamos a ml
                      if (anIng.unit == 'ml' && ing.unit == 'l') {
                        anIng.qty =
                          this.getNum(ing.qty) * 1000 + this.getNum(anIng.qty);
                      } else {
                        anIng.qty =
                          this.getNum(ing.qty) + this.getNum(anIng.qty) * 1000;
                      }
                      anIng.unit = 'ml';
                      ingFound = true;
                    }
                    j++;
                  }
                  if (!ingFound) {
                    recipe.ingredients.push(ing);
                  }
                } else if (this.isEmpty(ing.qty)) {
                  if (this.indexOfObject(recipe.ingredients, ing) == -1) {
                    recipe.ingredients.push(ing);
                  }
                } else {
                  recipe.ingredients.push(ing);
                }
              } else {
                recipe.ingredients.push(ing);
              }
            } else {
              recipe.ingredients.push(originalIng);
            }
          });
        }
      });
    }

    return recipe;
  }

  public getIngredientsSummary(recipe): unknown {
    recipe.ingredientsSummary = [];

    for (var groupIndex in recipe.groups) {
      var group = recipe.groups[groupIndex];
      for (var stepIndex in group.steps) {
        var step = group.steps[stepIndex];
        if (step && step.ingredients !== undefined) {
          for (
            var ingredientIndex = 0;
            ingredientIndex < step.ingredients.length;
            ingredientIndex++
          ) {
            var ingredient = step.ingredients[ingredientIndex];
            if (
              ingredient != null &&
              !this.isEmpty(ingredient.name) &&
              recipe.ingredientsSummary.indexOf(ingredient.name) == -1 &&
              !ingredient.reserved
            ) {
              recipe.ingredientsSummary.push(ingredient.name);
            }
          }
        }
      }
    }

    return recipe;
  }

  public getVirtuals(recipe): unknown {
    return this.getIngredientsSummary(
      this.getIngredients(this.getAccessoriesList(recipe)),
    );
  }

  public async postSearch(rawEs, req: Request, user): Promise<object> {
    let status = { count: rawEs.hits.total.value };

    let queryCategory =
      req.query.category == undefined
        ? req.body.categoryNiceName
          ? req.body.categoryNiceName.$in
            ? req.body.categoryNiceName.$in[0]
            : req.body.categoryNiceName
          : undefined
        : req.query.category;

    let result = rawEs.hits.hits.map((hit) => {
      let recipe = hit._source;

      recipe.__score__ = hit._score;

      return recipe;
    });

    let filteredResult = [];
    let randomResult = [];

    for (let recipe of result) {
      let filteredRecipe = this.filterStatus(user, recipe);

      if (
        !filteredRecipe['status'] ||
        !(filteredRecipe['status'].private && !filteredRecipe['status'].canView)
      ) {
        filteredResult.push(this.getVirtuals(recipe));
      }
    }

    if (req.body['status.done'] && user) {
      let skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
      let limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      filteredResult = filteredResult
        .sort((a, b) => {
          let aTime = user.done.find((done) => done.niceName === a.niceName);
          let bTime = user.done.find((done) => done.niceName === b.niceName);

          return bTime.lastTime.getTime() - aTime.lastTime.getTime();
        })
        .slice(skip, skip + limit);
    }

    if (queryCategory) {
      let category = await this.categoryRepo.fetchCategoryName(
        { niceName: queryCategory },
        { name: 1 },
      );
      status['title'] = category ? category.name : 'no category';
    }

    if (req.query.random) {
      let i = 0;

      if (filteredResult.length > parseInt(req.query.random as string)) {
        while (i < parseInt(req.query.random as string)) {
          let proposal =
            filteredResult[Math.floor(Math.random() * filteredResult.length)];

          if (
            proposal.niceName !== req.params.originalRecipe &&
            !randomResult.includes(proposal)
          ) {
            randomResult.push(proposal);
            i++;
          }
        }
      } else {
        randomResult = filteredResult.filter(
          (res) => res.niceName != req.params.originalRecipe,
        );
      }

      /* Heredado */
      randomResult = randomResult.map((item) => {
        let aux = {};

        aux['niceName'] = item.niceName;
        aux['title'] = item.title;
        aux['user'] = {};
        aux['user'].niceName = item.user.niceName;
        aux['images'] = item.images;

        return aux;
      });
    }

    return req.query.random ? randomResult : { status, result: filteredResult };
  }

  public async search_es(req: Request, ip): Promise<object> {
    let user = null;

    if (req['user'] != undefined) {
      user = await this.userRepo.findOne({
        niceName: req['user'].niceName,
        region: req['region'],
      });

      await this.addUserLog(
        {
          type: 'recipe/search',
          niceName: req.params.query,
        },
        req,
        ip,
        req['region'],
      );

      const config = await this.config();

      const elastic_idx =
        config['regions'][req['region']] &&
        config['regions'][req['region']].elastic_index
          ? config['regions'][req['region']].elastic_index
          : this.getDefaultElasticIndex(req['region']);

      if (elastic_idx) {
        let finalQuery: string | Array<unknown> | object;
        if (elastic_idx === 'recipes_de_mycooktouch') {
          let cerca = req.params.query
            ? await this.escapeTerm(
                req.params.query
                  .trim()
                  .replace('.*', ' ')
                  .replace(/\+/g, ' ')
                  .split(' ')
                  .filter((term) => term != '')
                  .join(' '),
              )
            : null;

          if (cerca == null || cerca == '') {
            finalQuery = await this.processQuery(req, user);
          } else {
            finalQuery = {
              from: req.query.skip || 0,
              size: req.query.limit || 10,
              _source: {
                includes:
                  filterRules.readFilter[req.query.profile as string].split(
                    ' ',
                  ),
              },
              query: {
                query_string: {
                  query: cerca,
                },
              },
            };
          }
        } else {
          finalQuery = this.processQuery(req, user);
        }

        return await this.postSearch(
          await Elastic.getClient().search({
            index: elastic_idx,
            body: finalQuery,
          }),
          req,
          user,
        );
      }
    }
  }
}
