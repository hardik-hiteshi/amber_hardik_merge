/* eslint-disable indent */
/* eslint-disable @typescript-eslint/naming-convention */
import * as express from 'express';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as JSZip from 'jszip';
import * as path from 'path';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AliasRepository } from '../alias/repository/alias.repository';
import { CategoriesDTO } from './dto/createRecipe/subDto';
import { CommonService } from 'src/common/services/common.service';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import Elastic from '../../common/singletons/elastic/elastic';
import { filterRules } from 'src/common/filters/recipe/defaultFilter';
import { json2csv } from 'json-2-csv';
import { NutritionalDisclaimerRepository } from '../nutritional-disclaimer/repository/nutritionalDisclaimer.repository';
import { promisify } from 'util';
import { RecipeDocument } from './schema/subSchema';
import { RecipeRepository } from './repository/recipe.repository';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';
import { UserDocument } from '../user/schema/user.schema';
import { UserLogRepository } from '../user-log/repository/UserLog.repository';
import { UserRepository } from '../user/repository/user.repository';
@Injectable()
export class RecipeService {
  public constructor(
    private recipeRepo: RecipeRepository,
    private userRepo: UserRepository,
    private userLog: UserLogRepository,
    private aliasRepo: AliasRepository,
    private commonService: CommonService,
    private nutritionalDisclaimerRepo: NutritionalDisclaimerRepository,
  ) {}

  public async createRecipe(
    region: string,
    body: CreateRecipeDto,
    ip: string,
    user: UserDocument,
    userAgent: string,
  ): Promise<object> {
    if (!body.user) {
      body.user = {};
      body.user['niceName'] = user.niceName;
      body.user['displayName'] = user.name.displayName || '';
      body.user['rank'] = user.rank;
      body.user['role'] = user.role;
      body.user['images'] = user.image;

      if (user.profile && user.profile.social) {
        body.user['instagram'] = user.profile.social.instagram || '';
        body.user['googleplus'] = user.profile.social.googleplus || '';
        body.user['twitter'] = user.profile.social.twitter || '';
        body.user['web'] = user.profile.social.web || '';
        body.user['webName'] = user.profile.social.webName || '';
      }
    }

    if (body.categories && !body.category && !body.categoryNiceName) {
      if (body.categories.length > 0) {
        body.category = body.categories[0].name;
        body.categoryNiceName = body.categories[0].niceName;
      }
    }

    if (body.category && body.categoryNiceName) {
      if (!body.categories && body.category && body.categoryNiceName) {
        body.categories = [];
        const obj = {
          id: body.catId,
          name: `${body.category}`,
          niceName: `${body.categoryNiceName}`,
        };
        const data = body.categories.find((item: CategoriesDTO) => {
          item.id === body.catId;
        });
        if (!data) {
          body.categories.push(obj);
        }
      }
    }

    if (!body.compatibility && !body.compatibility['current']) {
      body.compatibility['current'] = ['S1'];
    }

    if (!body.grants.search.includes('main')) body.grants.search.push('main');

    body.info.creationSource = ip + ' - ' + user.niceName + ' - ' + userAgent;
    const recipeExists = await this.recipeRepo.findOne(region, body);
    if (recipeExists) {
      throw new BadRequestException('Recipe already exists.');
    }

    const recipe = await this.recipeRepo.createRecipe(region, body);

    const addRecipeLog = {
      type: 'recipe/new',
      niceName: body.niceName,
      recipe: {
        niceName: body.niceName,
        title: body.title,
      },
    };

    // const userDraftGrants = body.grants.view.filter(
    //   (val) => val && val.startsWith('draft/'),
    // );

    // if (userDraftGrants.length == 0) {
    //   ev.emitAsync('new-recipe', body);
    // }

    // ev.emitAsync('new-recipe-nutritional', body);

    await this.userLog.createnewlog(addRecipeLog);

    const response = {
      niceName: recipe.niceName,
    };

    return response;
  }

  public async fetchAllRecipes(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const recipeList = await this.recipeRepo.fetchRecipes(
      region,
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.recipeRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: recipeList,
    };
  }

  public async fetchRecipe(
    region: string,
    niceName: string,
    user: UserDocument,
    req: express.Request,
    profile?: string,
  ): Promise<RecipeDocument> {
    const profileFilter = filterRules.readFilter[profile];
    // const profileFilter = {};
    const where = {};
    if (region != '') where['region'] = region;
    where['niceName'] = niceName;
    let result = await this.recipeRepo.fetchOneByNiceName(where, profileFilter);
    if (!result) {
      const alias = await this.aliasRepo.findOneByNiceNameAndRegion(
        niceName,
        region,
      );
      if (!alias) {
        throw new NotFoundException('Alias Does not exist.');
      }

      result = await this.recipeRepo.fetchOne(region, alias.niceName);

      if (!result) {
        throw new NotFoundException('Recipe Does not exist.');
      }
    }

    if (!user) {
      result = <RecipeDocument>(
        (<unknown>this.commonService.filterStatus(result))
      );
      if (
        result.status &&
        (result.status['private'] || result.status['draft']) &&
        !result.status['canView']
      ) {
        throw new NotFoundException('Not found');
      }
    } else {
      this.commonService.filterStatus(result, user);
      if (
        result.status['private'] &&
        !result.status['canView'] &&
        !this.commonService.isAdminRole(user.role)
      ) {
        throw new NotFoundException('Not found');
      }
    }
    await this.appendLog(
      {
        type: 'recipe/view',
        niceName,
      },
      req,
      req.query['retry'] as string,
      region,
    );

    const resultPrune = this.commonService.prune(result);
    if (!Array.isArray(resultPrune)) {
      result = resultPrune;
    }
    const nutritionalDisclaimer = await this.nutritionalDisclaimerRepo.fetchND(
      result.region,
    );

    result['nutritionalExtra'] = this.commonService.addNutritionalColor(result);
    if (nutritionalDisclaimer) {
      delete nutritionalDisclaimer._id;
      delete nutritionalDisclaimer.__v;
      delete nutritionalDisclaimer.region;
      delete nutritionalDisclaimer.niceName;
      result['nutritionalExtra'].disclaimer = nutritionalDisclaimer;

      if (
        result.size &&
        result.size['current'] &&
        !isNaN(parseInt(result.size['current']))
      ) {
        result['nutritionalExtra'].disclaimer.calculateFor =
          nutritionalDisclaimer.calculateForPax;
      } else {
        result['nutritionalExtra'].disclaimer.calculateFor =
          nutritionalDisclaimer.calculateForRecipe;
      }
      delete result['nutritionalExtra'].disclaimer.calculateForPax;
      delete result['nutritionalExtra'].disclaimer.calculateForRecipe;
    }

    return result;
  }

  public async updateRecipe(
    region: string,
    incomingRecipe: UpdateRecipeDto,
    nicenameItem: string,
    ip: string,
    user: UserDocument,
    userAgent: string,
  ): Promise<object> {
    if (this.commonService.isEmpty(incomingRecipe) || !nicenameItem) {
      throw new BadRequestException();
    }
    const where = {};

    if (region != '') where['region'] = region;

    let result = await this.recipeRepo.findOneByQuery(where);

    if (!result) throw new NotFoundException();

    //The document exists, we can continue processing
    let authorized = true;
    let message = '';
    //Profile permissions control
    if (
      user.niceName !== result.user['niceName'] &&
      !this.commonService.isAdminRole(user.role)
    ) {
      authorized = false;
      message +=
        'User ' +
        user.niceName +
        ' cannot modify ' +
        result.user['niceName'] +
        "'s recipe " +
        nicenameItem +
        '. \r\n';
    }

    // //Control user and info field edition
    // if (!common.isAdminRole(req.user.role) && (incomingRecipe.user || incomingRecipe.info)) {
    //     authorized = false;
    //     message += "User " + req.user.niceName + " cannot modify user or info recipe fields. \r\n";
    // }

    //Control recipe niceName modificaction
    if (
      !this.commonService.isAdminRole(user.role) &&
      incomingRecipe['niceName'] &&
      incomingRecipe['niceName'] !== nicenameItem
    ) {
      authorized = false;
      message +=
        'User ' + user.niceName + ' cannot modify the recipe niceName. \r\n';
    }

    if (authorized === false) {
      throw new UnauthorizedException(message);
    }

    if (incomingRecipe.niceName == undefined) {
      incomingRecipe.niceName = nicenameItem;
    }

    this.commonService.setProp(
      incomingRecipe,
      'info.modificationDate',
      new Date(),
    );
    const niceName = user && user.niceName ? user.niceName : 'N/A';
    this.commonService.setProp(
      incomingRecipe,
      'info.modificationSource',
      ip + ' - ' + niceName + ' - ' + userAgent,
    );

    //---------------------------START COMMENTS COUNTER
    let totalComments = 0;
    if (incomingRecipe.comments && incomingRecipe.comments.length > 0) {
      totalComments = this.countAllComments(incomingRecipe.comments);
    } else if (result.comments && result.comments.length > 0) {
      totalComments = this.countAllComments(result.comments);
    }
    this.commonService.setProp(
      incomingRecipe,
      'social.comments',
      totalComments,
    );
    //-----------------------------END COMMENTS COUNTER

    //!!!!! CAUTION !!!!!: The pre is only called when using model.save (not model.update)

    result = await this.recipeRepo.findOneByQuery(where);

    if (result == null) {
      throw new NotFoundException();
    }
    // INFO: Change on this field only from from db or console
    if (this.commonService.getProp(result, 'info.creationDate') == undefined) {
      this.commonService.setProp(result, 'info.creationDate', new Date());
    }
    // INFO: virtuals are inside incomingRecipe but they're discarded
    //'grants.search',
    const unmutableKeys = [
      'niceName',
      'info.creationDate',
      'info.creationSource',
      'compatibility',
    ];

    const oldMain = result.grants.search.length
      ? result.grants.search.includes('main')
      : false; /* Ñapa webs antiguas */

    this.commonService.putProps(result, incomingRecipe, unmutableKeys);

    /* Ñapa webs antiguas */
    if (oldMain) {
      if (result.grants.search.length) {
        if (!result.grants.search.includes('main')) {
          result.grants.search.push('main');
        }
      } else {
        result.grants.search = ['main', 'public'];
      }
    }
    /* END Ñapa webs antiguas */

    // Size update
    const currentSize = <string>(
      this.commonService.getProp(incomingRecipe, 'size.current')
    );
    if (
      currentSize != undefined &&
      result.size &&
      (!result.size[currentSize] ||
        (result.size[currentSize] &&
          result.size[currentSize] != result.niceName))
    ) {
      // we need to delete the old key if exists
      Object.keys(result.size).forEach((sizeKey) => {
        if (sizeKey != 'current') {
          const sizeNicename = result.size[sizeKey];
          if (sizeNicename == result.niceName && sizeKey != currentSize) {
            delete result.size[sizeKey];
          }
        }
      });
      result.size[currentSize] = result.niceName;
      result.size['current'] = currentSize;
      result.markModified('size');
    } else {
      if (!result.size || Object.keys(result.size).length == 0) {
        if (this.commonService.getProp(result, 'size.current') != undefined) {
          const currSz = this.commonService.getProp(result, 'size.current');
          result.size = {
            current: currSz,
          };
        }
      }
    }

    // Compatibility mode for categories
    if (incomingRecipe.category && incomingRecipe.categoryNiceName) {
      if (!result.categories) {
        result.categories = [];
      }
      if (result.categories.length > 0) {
        result.categories[0] = {
          name: incomingRecipe.category,
          niceName: incomingRecipe.categoryNiceName,
        };
      } else {
        result.categories.push({
          name: incomingRecipe.category,
          niceName: incomingRecipe.categoryNiceName,
        });
      }
    }

    /* Formats */
    const formatsToUnset = [];
    const formatsToPush = [];

    /* Arreglo para publicar recetas en draft, 
      las recetas no estan bien formadas en el editRecipe.js, debería corregirse en front */

    const incomingCompatArray = Array.isArray(incomingRecipe.compatibility)
      ? incomingRecipe.compatibility
      : incomingRecipe.compatibility && incomingRecipe.compatibility['current']
      ? incomingRecipe.compatibility['current']
      : null;

    if (incomingCompatArray && Array.isArray(incomingCompatArray)) {
      if (
        !this.commonService.equalArrays(
          incomingCompatArray,
          result.compatibility['current'],
        )
      ) {
        for (const format of incomingCompatArray) {
          if (!result.compatibility['current'].includes(format)) {
            result.compatibility[format] = result.niceName;
            result.compatibility['current'].push(format);

            formatsToPush.push(format);
          }
        }

        for (const format of result.compatibility['current']) {
          if (!incomingCompatArray.includes(format)) {
            delete result.compatibility[format];
            result.compatibility['current'] = result.compatibility[
              'current'
            ].filter((f) => f != format);

            formatsToUnset.push(format);
          }
        }

        result.markModified('compatibility');
      }
    }

    const recipe = await result.save();

    try {
      /* Update compatibility.current for my sizes, I'm already updated */

      if (formatsToPush.length || formatsToUnset.length) {
        //console.log("formatsToPush", formatsToPush);
        //console.log("formatsToUnset", formatsToUnset);

        let niceNamesToUpdate = [];
        //Object.values(recipe.size).filter(val => val != recipe.size.current && val != recipe.niceName);

        //console.log(niceNamesToUpdate);

        // await Recipe.updateMany({ niceName: { $in: niceNamesToUpdate } }, {
        //     $pull: { "compatibility.current": { $in: formatsToUnset } },
        // });

        // await Recipe.updateMany({ niceName: { $in: niceNamesToUpdate } }, {
        //     $push: { "compatibility.current": { $each: formatsToPush } },
        // });

        /* Add my formats */
        const myFormats = Object.values(recipe.compatibility).filter(
          (val) => !Array.isArray(val) && val != recipe.niceName,
        );
        niceNamesToUpdate.push(...myFormats);

        /* Get sizes of my formats */
        //let extra = await Recipe.find({ niceName: { $in: myFormats }, region: req.region },
        // { size: 1, _id: 0 }).lean().exec();
        //niceNamesToUpdate.push.apply(niceNamesToUpdate, extra.reduce((p, n) =>
        //  { return p.concat(Object.values(n.size).filter(val => val != n.
        // size.current && val != recipe.niceName)) }, []));

        /* Remove repeated niceNames, ensure I'm not in the set: */
        niceNamesToUpdate = niceNamesToUpdate.filter(
          (r, idx, arr) => arr.indexOf(r) === idx && r != recipe.niceName,
        );

        //console.log(niceNamesToUpdate);

        /* Set and unset formats for the selected niceNames */
        const update = {};

        if (formatsToUnset.length) {
          const oldFormats = {};

          for (const format of formatsToUnset)
            oldFormats['compatibility.' + format] = '';

          update['$unset'] = oldFormats;
        }

        if (formatsToPush.length) {
          const newFormats = {};

          for (const format of formatsToPush)
            newFormats['compatibility.' + format] = recipe.niceName;

          update['$set'] = newFormats;
        }

        await this.recipeRepo.updateByQuery(
          { niceName: { $in: niceNamesToUpdate } },
          update,
        );

        /* Elastic:  */

        const elastic_idx = this.commonService.config()['regions'][
          recipe.region
        ]
          ? this.commonService.config()['regions'][recipe.region].elastic_index
          : null;

        if (elastic_idx) {
          for (const niceName of niceNamesToUpdate) {
            const target = await this.recipeRepo.findOneByQuery({ niceName });
            const { _id, __v, ...actualRecipe } = target;

            await Elastic.getClient().index({
              index: elastic_idx,
              body: actualRecipe,
              id: _id.toString(),
              refresh:
                niceName == niceNamesToUpdate[niceNamesToUpdate.length - 1],
            });
          }
        }
      }
    } catch (err) {
      // console.error(inspect(err, false, 16));
      throw new InternalServerErrorException();
    }

    // ev.emitAsync('updated-recipe', recipe);

    //I'm not sure if we should return raw

    return;
  }
  // public async deleteRecipe(region: string, niceName: string): Promise<object> {
  //   const recipe = await this.recipeRepo.deleteRecipe(region, niceName);
  //   if (recipe == null) {
  //     throw new NotFoundException('Recipe Does not exist.');
  //   }

  //   return { message: 'Deleted Success' };
  // }

  //this api is not working as expexted at the moment.
  public async cloneToNewTouch(
    region: string,
    identifier: string,
    body: RecipeDocument,
  ): Promise<Partial<RecipeDocument>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    const { _id, __v, ...actualRecipe } = body['recipe'];
    const originalNiceName = actualRecipe.niceName;
    const doc = await this.recipeRepo.createRecipe(region, actualRecipe);

    if (doc) {
      if (doc.compatibility && doc.compatibility[identifier]) {
        return { compatibility: doc['recipe']['compatibility'][identifier] };
      }

      doc.comments = [];
      doc.ratings = [];
      if (!doc.social) {
        doc.social = {
          favorite: 0,
          facebook: 0,
          comments: 0,
          ratings: 0,
          todo: 0,
        };
      }
      doc.status.nutritional = 'Auto (Good)';

      if (!doc.compatibility) doc.compatibility = {};

      doc.compatibility['current'] = [identifier];

      doc.status.idParent = '';

      //NiceName to recognize recipes
      const regex = /^(.*)(-s\d+)$/;
      const matches = doc.niceName.match(regex);
      if (matches != null) {
        doc.niceName = matches[1];
      }

      doc.niceName += '-' + identifier;
      if (!doc.grants) {
        doc.grants = { _: '', search: [], view: [] };
      }

      doc.grants.search = doc.grants.search
        ? doc.grants.search.filter((grant) => grant != 'main')
        : ['public'];

      const oldSize = { ...doc.size };

      doc.size = {};
      doc.size['current'] = oldSize['current'];
      doc.size[doc.size['current']] = doc.niceName;

      const sizesToCheck = Object.keys(oldSize).filter(
        (k) => k != 'current' && k != oldSize['current'],
      );

      const sizesToUpdate = [];
      for (const k of sizesToCheck) {
        const sizedRecipeNiceName = oldSize[k];

        const existsForNewCompat = await this.recipeRepo.findOneforCompat(
          {
            niceName: sizedRecipeNiceName,
            ['compatibility.' + identifier]: { $exists: true },
            region,
          },
          { _id: 0, ['compatibility.' + identifier]: 1 },
        );

        if (existsForNewCompat) {
          sizesToUpdate.push(existsForNewCompat.compatibility[identifier]);

          doc.size[k] = existsForNewCompat.compatibility[identifier];
          await this.recipeRepo.updateOneNewCompat(
            region,
            existsForNewCompat['compatibility'][identifier],
            doc.niceName,
            oldSize['current'],
          );
        }
      }

      if (sizesToUpdate.length && !doc.grants.search.includes('multisize')) {
        doc.grants.search.push('multisize');
      } else if (
        !sizesToUpdate.length &&
        doc.grants.search.includes('multisize')
      ) {
        doc.grants.search = doc.grants.search.filter((g) => g != 'multisize');
      }
      doc.compatibility[identifier] = doc.niceName;

      doc.markModified('size');
      doc.markModified('compatibility');
      doc.markModified('grants');

      await doc.save();

      let niceNamesToUpdate = Object.values(doc.compatibility).filter((val) => {
        !Array.isArray(val) && val != doc.niceName;
      });
      niceNamesToUpdate = niceNamesToUpdate.filter((r, idx, arr) => {
        arr.indexOf(r) === idx;
      });

      const newFormat = {};
      newFormat['compatibility.' + identifier] = doc.niceName;

      /* Set formats for all recipes: Pax, original and new: */
      await this.recipeRepo.updateniceNames(
        { niceName: { $in: niceNamesToUpdate }, region },
        { $set: newFormat },
      );

      //Will work on this later when we will add elastic search feature.
      // let elastic_idx =
      //   config.regions[region] && config.regions[region].elastic_index
      //     ? config.regions[req.region].elastic_index
      //     : common.getDefaultElasticIndex(req.region);

      // if (elastic_idx) {
      //   await Elastic.getClient().updateByQuery({
      //     index: elastic_idx,
      //     conflicts: 'proceed',
      //     body: {
      //       script: {
      //         source:
      //           'ctx._source.compatibility.' +
      //           req.params.identifier +
      //           " = '" +
      //           doc.niceName +
      //           "';",
      //         lang: 'painless',
      //       },
      //       query: {
      //         bool: {
      //           must: [
      //             {
      //               terms: {
      //                 'niceName.keyword': niceNamesToUpdate,
      //               },
      //             },
      //           ],
      //           filter: [
      //             {
      //               term: {
      //                 'region.keyword': req.region,
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     },
      //   });

      //   if (sizesToUpdate.length) {
      //     await Elastic.getClient().updateByQuery({
      //       index: elastic_idx,
      //       conflicts: 'proceed',
      //       body: {
      //         script: {
      //           source: `ctx._source.size.${oldSize['current']} = '${doc.niceName}'`,
      //           lang: 'painless',
      //         },
      //         query: {
      //           bool: {
      //             must: [
      //               {
      //                 terms: {
      //                   'niceName.keyword': sizesToUpdate,
      //                 },
      //               },
      //             ],
      //             filter: [
      //               {
      //                 term: {
      //                   'region.keyword': region,
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //       },
      //     });
      //   }
      // }

      if (body['copyImage']) {
        const imagePath = path.join(__dirname, '..', '..', '..', '/uploads');
        let fromPath;
        let found = false;
        for (const ext of ['.jpg', '.png', '.webp']) {
          fromPath = path.join(
            imagePath,
            region,
            'recipe',
            originalNiceName + '$0' + ext,
          );

          if (await fs.exists(fromPath)) {
            found = true;
            break;
          }
        }
        if (found) {
          let cacheFiles = [];
          cacheFiles = glob.sync(
            imagePath +
              '/.cache/' +
              region +
              '/recipe/**/' +
              doc.niceName +
              '$0.*',
          );
          for (const cacheFile of cacheFiles)
            await promisify(fs.unlink)(cacheFile);

          const oldFiles = await promisify(glob)(
            imagePath + '/' + region + '/recipe/' + doc.niceName + '$0.*',
          );

          for (const oldFile of oldFiles) await promisify(fs.unlink)(oldFile);

          const toPath = path.join(
            imagePath,
            region,
            'recipe',
            doc.niceName + '$0' + path.extname(fromPath),
          );
          fs.copyFileSync(fromPath, toPath);
        } else {
          const imagePath = path.join(__dirname, '..', '..', '..', '/uploads');
          const oldFiles = await promisify(glob)(
            imagePath + '/' + region + '/recipe/' + doc.niceName + '$0.*',
          );

          for (const oldFile of oldFiles) await promisify(fs.unlink)(oldFile);

          return { niceName: doc.niceName };
        }
      }
    }
  }

  public async exportFile(
    region: string,
    type: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const recipes = await this.recipeRepo.fetchRecipes(region);

    if (recipes.length <= 0) throw new NotFoundException('Recipes not found');
    if (type == 'csv') {
      const csv = await json2csv(recipes);

      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'xlsx') {
      const ws = xlsx.utils.json_to_sheet(recipes);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      const xlsxData = xlsx.write(wb, {
        bookType: 'xlsx',
        type: 'buffer',
      }) as Buffer;

      return { data: xlsxData, type };
    } else if (type === 'jsonzip') {
      const jsonFiles: Buffer[] = [];
      const zip = new JSZip();
      const zipFolder = zip.folder('json_data');
      for (const entry of recipes) {
        const jsonData = JSON.stringify(entry, null, 2);
        jsonFiles.push(Buffer.from(jsonData));
      }

      for (let i = 0; i < jsonFiles.length; i++) {
        zipFolder.file(`data_${i}.json`, jsonFiles[i]);
      }

      const data = await zip.generateAsync({ type: 'nodebuffer' });

      return { data, type: 'zip' };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(recipes));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }

  public async appendLog(
    log: object,
    req: express.Request,
    last: string,
    region: string,
  ): Promise<void> {
    if (last) await this.commonService.updateUserLog(log, req, last);
    else await this.commonService.addUserLog(log, req, req.ip, region);
  }

  //   public async addComment(
  //     region: string,
  //     niceName: string,
  //     parent: string,
  //     body: RecipeDocument,
  //     user: UserDocument,
  //   ): Promise<Partial<RecipeDocument>> {
  //     // return await this.recipeRepo.addComment(region, niceName, parent, body);
  //     let commentId;
  //     const recipeNiceName = niceName;
  //     const comment = body;

  //     if (!comment['text']) {
  //       throw new BadRequestException(
  //         "The comment body should contain a 'text' variable",
  //       );
  //     }
  //     const where = {};

  //     where['region'] = region;

  //     where['niceName'] = recipeNiceName;

  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     await this.recipeRepo.findOneforCompat(where, { _id: 0, __v: 0 });
  //     // .lean()
  //     // .exec()
  //     // .then(update, error)
  //     // .then(addLog, error);
  //     // have to add log for this

  //     const userNiceName = user.niceName;

  // }

  public async deleteRecipe(
    region: string,
    niceName: string,
    user: UserDocument,
  ): Promise<void> {
    const where = { niceName };

    if (region !== '') {
      where['region'] = region;
    }

    const result = await this.recipeRepo.findOneByQuery(where);

    if (!result) {
      throw new NotFoundException('recipe not found');
    }

    if (
      user.niceName !== result.user['niceName'] &&
      !this.commonService.isAdminRole(user.role)
    ) {
      throw new UnauthorizedException();
    }

    const response = await this.recipeRepo.deleteByQuery(where);

    if (response == null) {
      throw new NotFoundException();
    }

    const elastic_idx =
      this.commonService.config()['regions'][region]?.elastic_index ||
      this.commonService.getDefaultElasticIndex(region);

    let sizesNN = [];
    let formatsNN = [];

    if (Object.keys(result.size).length != 2) {
      sizesNN = Object.keys(result.size)
        .filter((k) => k != 'current')
        .map((k) => result.size[k])
        .filter((n) => n != result.niceName);

      const size_update = {};
      const oldSizes = {};
      oldSizes['size.' + result.size['current']] = '';

      size_update['$unset'] = oldSizes;

      await this.recipeRepo.updateByQuery(
        { niceName: { $in: sizesNN }, region },
        size_update,
      );
    }

    if (Object.keys(result.compatibility).length != 2) {
      formatsNN = Object.values(result.compatibility).filter(
        (s) => !Array.isArray(s) && s != result.niceName,
      );
      /* Get sizes of my formats */
      //let sizes = await Recipe.find({ niceName: { $in: formatsNN } }, { size: 1, _id: 0 });
      //formatsNN.push.apply(formatsNN,
      // sizes.reduce((p, n) => { return p.concat(Object.values(n.size).filter(ns => ns != n.size.current)) }, []));

      /* Remove repeated niceNames */
      formatsNN = formatsNN.filter((r, idx, arr) => arr.indexOf(r) === idx);

      const formatsToUnset = result.compatibility['current'];

      const update = {};
      const oldFormats = {};

      for (const format of formatsToUnset)
        oldFormats['compatibility.' + format] = '';

      update['$unset'] = oldFormats;

      await this.recipeRepo.updateByQuery(
        { niceName: { $in: formatsNN }, region },
        update,
      );
    }

    // Cuando borramos la receta de una compatibilidad que NO tiene multisize (y no eres main)
    // entonces busca una hermanita (es decir de mi compatibilidad) y si tengo... le quito el multisize

    if (result.grants && Array.isArray(result.grants.search)) {
      if (result.grants.search.includes('main')) {
        //Look for candidates to set the main
        const siblingSizes = Object.values(result.size).filter(
          (size) => isNaN(parseInt(size)) && size != result.niceName,
        );

        if (siblingSizes.length) {
          await this.recipeRepo.updateByQuery(
            {
              niceName: siblingSizes[0],
              region,
            },

            { $push: { 'grants.search': 'main' } },
          );

          await this.recipeRepo.updateByQuery(
            {
              niceName: siblingSizes[0],
              region,
            },
            { $pull: { 'grants.search': 'multisize' } },
          );
        } else {
          const siblingCompats = Object.values(result.compatibility).filter(
            (compat) => !Array.isArray(compat) && compat != result.niceName,
          );

          if (siblingCompats.length) {
            await this.recipeRepo.updateByQuery(
              {
                niceName: { $in: siblingCompats },
                'grants.search': { $ne: 'multisize' },
                region,
              },
              { $push: { 'grants.search': 'main' } },
            );
          }
        }
      } else if (!result.grants.search.includes('multisize')) {
        const siblingSizes = Object.values(result.size).filter(
          (size) => isNaN(parseInt(size)) && size != result.niceName,
        );

        if (siblingSizes.length) {
          await this.recipeRepo.updateByQuery(
            {
              niceName: { $in: siblingSizes },
              'grants.search': 'multisize',
              region,
            },
            { $pull: { 'grants.search': 'multisize' } },
          );
        }
      }
    }
    // Code for sizesNN and formatsNN calculations...

    // Update code for sizesNN and formatsNN...

    // Code for grants.search updates...

    if (elastic_idx) {
      // Code for Elastic operations...
      const niceNamesToIndex = formatsNN.concat(sizesNN);

      for (const niceName of niceNamesToIndex) {
        const target = await this.recipeRepo.findOneByQuery({ niceName });
        const { _id, __v, ...actualRecipe } = target;

        await Elastic.getClient().index({
          index: elastic_idx,
          body: actualRecipe,
          id: _id.toString(),
          refresh: niceName == formatsNN[formatsNN.length - 1],
        });
      }
    }

    if (elastic_idx) {
      await Elastic.getClient().delete({
        id: result._id,
        index: elastic_idx,
        refresh: true,
      });
    }

    // ev.emitAsync("deleted-recipe", result, req.user.niceName);
  }

  public countAllComments(comments: Array<object>): number {
    let totalComments = 0;
    if (comments) {
      for (let i = 0; i < comments.length; i++) {
        totalComments += this.countComments(comments[i]);
      }
    }

    return totalComments;
  }
  public countComments(c): number {
    let total = 0;
    if (c) {
      if (c.text && c.text != '') {
        total++;
      }
      if (c.comments && c.comments.length > 0) {
        for (let i = 0; i < c.comments.length; i++) {
          total += this.countComments(c.comments[i]);
        }
      }
    }

    return total;
  }
}
