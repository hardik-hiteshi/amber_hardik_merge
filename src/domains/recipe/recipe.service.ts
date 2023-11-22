import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as JSZip from 'jszip';
import * as path from 'path';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesDTO } from './dto/createRecipe/subDto';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { json2csv } from 'json-2-csv';
import { promisify } from 'util';
import { RecipeDocument } from './schema/subSchema';
import { RecipeRepository } from './repository/recipe.repository';
import { Request } from 'express';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';
// import { UserDocument } from '../user/schema/user.schema';
import { CommonService } from 'src/common/services/common.service';
import { UserRepository } from '../user/repository/user.repository';
// import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';

@Injectable()
export class RecipeService {
  public constructor(
    private recipeRepo: RecipeRepository,
    private userRepo: UserRepository,
    private commonService: CommonService,
  ) {}

  public async createRecipe(
    region: string,
    body: CreateRecipeDto,
  ): Promise<object> {
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

    const recipeExists = await this.recipeRepo.findOne(region, body);
    if (recipeExists) {
      throw new BadRequestException('Recipe already exists.');
    }

    const recipe = await this.recipeRepo.createRecipe(region, body);
    const response = {
      niceName: recipe.niceName,
    };

    return response;
  }

  public async fetchAllRecipes(
    req: Request,
    // region: string,
    // pageNumber: number,
    // pageSize: number,
    // search?: string,
  ): Promise<object> {
    req.body = {};
    if (req.query.category) {
      req.body['categories.niceName'] = req.query.category;
    }

    if (req.query.user) {
      req.body['user.niceName'] = req.query.user;
    }
    req.body['status.idParent'] = '';

    if (req.query.category && !req.body['categories.niceName'])
      req.body.categoryNiceName = req.query.category;

    return await this.commonService.search_es(req, req.ip);

    // const recipeList = await this.recipeRepo.fetchRecipes(
    //   region,
    //   pageNumber,
    //   pageSize,
    //   search,
    // );

    // const count = await this.recipeRepo.countDocs({ region });

    // return {
    //   status: {
    //     count,
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     search_count: count,
    //   },
    //   result: recipeList,
    // };
  }

  public async fetchRecipe(
    region: string,
    niceName: string,
  ): Promise<RecipeDocument> {
    const recipe = await this.recipeRepo.fetchOne(region, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }

  public async updateRecipe(
    region: string,
    body: UpdateRecipeDto,
    niceName: string,
  ): Promise<object> {
    if (body.categories && body.categories.length > 0) {
      body.category = body.categories[0].name;
      body.categoryNiceName = body.categories[0].niceName;
    } else {
      body.category = '';
      body.categoryNiceName = '';
    }

    if (body.category && body.categoryNiceName) {
      if (!body.categories) {
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

    const recipe = await this.recipeRepo.updateRecipe(region, body, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    const response = {
      niceName: recipe.niceName,
    };

    return response;
  }

  public async deleteRecipe(region: string, niceName: string): Promise<object> {
    const recipe = await this.recipeRepo.deleteRecipe(region, niceName);
    if (recipe == null) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return { message: 'Deleted Success' };
  }

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
}
