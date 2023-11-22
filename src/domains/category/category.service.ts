/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDocument } from './schema/category.schema';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryDTO } from './dto/createcategory/createcategory.dto';
import { HelperService } from '../../common/services/helper.service';
import { RecipeRepository } from '../recipe/repository/recipe.repository';
import { Request } from 'express';
import { UpdateCategoryDTO } from './dto/updatecategory/updatecategory.dto';
import { UserRepository } from '../user/repository/user.repository';
@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  public constructor(
    public categoryRepo: CategoryRepository,
    public helperService: HelperService,
    public recipeRepo: RecipeRepository,
    public userRepo: UserRepository,
  ) {}

  public async createCategory(
    region: string,
    body: CreateCategoryDTO,
  ): Promise<object> {
    body.niceName = body.name.toLowerCase().replace(/\s+/g, '-');
    const existingCategory = await this.categoryRepo.findOne(region, body);

    if (existingCategory) {
      throw new BadRequestException('Category already exists.');
    }

    const newCategory = await this.categoryRepo.createCategory(region, body);
    const response = {
      niceName: newCategory.niceName,
    };

    return response;
  }

  public async fetchCategory(
    request: Request,
    region: string,
    niceName: string,
  ): Promise<CategoryDocument> {
    this.logger.log(`${request.method} ${request.url} in region ${region}`);
    const category = await this.categoryRepo.fetchCategory(region, niceName);

    if (category) {
      return category;
    }
    throw new NotFoundException(`Category ${niceName} not found`);
  }

  public async updateCategory(
    region: string,
    niceName: string,
    body: UpdateCategoryDTO,
  ): Promise<object> {
    const updatedCategory = await this.categoryRepo.updateCategory(
      region,
      niceName,
      body,
    );

    if (!updatedCategory) {
      throw new NotFoundException('Document not found');
    }

    const response = {
      niceName: updatedCategory.niceName,
    };

    return response;
  }

  public async deleteCategory(
    region: string,
    niceName?: string,
  ): Promise<object> {
    const deletedCategory = await this.categoryRepo.deleteCategory(
      region,
      niceName,
    );

    if (!deletedCategory) {
      throw new NotFoundException('Category does not exist.');
    }

    return { message: 'Deleted Success' };
  }

  public async exportToJson(region: string): Promise<Buffer> {
    const data = await this.categoryRepo.fetchAllCategories(region);
    if (data.length <= 0) {
      throw new NotFoundException('No data to export');
    }
    const expData = Buffer.from(JSON.stringify(data));

    return expData;
  }

  public async fetchCategories(
    req: Request,
    region: string,
    compat: string,
    visibility: boolean,
    profile: string,
    type: string,
    pageNumber?: number,
    pageSize?: number,
    search?: string,
  ): Promise<Array<object>> {
    // eslint-disable-next-line prefer-const
    let where = {};

    if (region != '') {
      where['region'] = region;
    }

    if (visibility != undefined) {
      where['visibility'] = visibility !== false;
    }

    const projection = {
      niceName: 1,
      visibility: 1,
      region: 1,
      name: 1,
      _id: 0,
    };

    if (profile === 'voice') {
      projection['synonyms'] = 1;
    }

    const sort = { sort: { name: 1 } };

    const cats = await this.categoryRepo.fetchCategories(
      where,
      projection,
      sort,
      pageNumber,
      pageSize,
      search,
    );

    let _cats = {};

    // eslint-disable-next-line no-var
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].niceName) {
        _cats[cats[i].niceName] = cats[i];
      }
    }

    delete where['visibility'];

    const query = await this.helperService.getRecipePipelineQuery(
      where['region'],
      req['user'],
      [],
      compat,
    );

    const recipeData = await this.recipeRepo.aggregate(query);

    if (recipeData) {
      const recipeDataArray = Array.isArray(recipeData)
        ? recipeData
        : [recipeData];

      let totals = [
        'favorites',
        'toDo',
        'done',
        'mine',
        'checked',
        '__global__',
      ].reduce((acum, type) => {
        let keys = {
          repeated: type === '__global__' ? 'repeated' : type + 'Repeated',
          count: type === '__global__' ? 'count' : type + 'Count',
        };

        acum[keys.count] = parseInt(
          recipeDataArray.reduce(
            (sum, cat) => (cat[keys.repeated] ? sum + cat[keys.repeated] : sum),
            0,
          ),
        );

        return acum;
      }, {});

      const promises = recipeDataArray.map(async (c) => {
        if (_cats[c._id]) {
          _cats[c._id].count = c.count;
          _cats[c._id].mineCount = c.mineCount != undefined ? c.mineCount : 0;
          _cats[c._id].draftCount =
            c.draftCount != undefined ? c.draftCount : 0;
          _cats[c._id].favoritesCount =
            c.favoritesCount != undefined ? c.favoritesCount : 0;
          _cats[c._id].checkedCount =
            c.checkedCount != undefined ? c.checkedCount : 0;
          _cats[c._id].toDoCount = c.toDoCount != undefined ? c.toDoCount : 0;
          _cats[c._id].doneCount = c.doneCount != undefined ? c.doneCount : 0;
          _cats[c._id].totals = totals;
        }
      });

      await Promise.all(promises);

      // Turn it back to an array
      let _catArray = Object.keys(_cats).map((el) => _cats[el]);

      // Fill counts if no recipe for that category is found
      _catArray.forEach((cat) => {
        if (!cat.count) cat.count = 0;
        if (!cat.mineCount) cat.mineCount = 0;
        if (!cat.draftCount) cat.draftCount = 0;
        if (!cat.favoritesCount) cat.favoritesCount = 0;
        if (!cat.toDoCount) cat.toDoCount = 0;
        if (!cat.doneCount) cat.doneCount = 0;
        if (!cat.checkedCount) cat.checkedCount = 0;
      });

      if (!req['user']) {
        return <Array<object>>_catArray;
      }

      const userPromises = _catArray.map(async (category) => {
        const count = await this.recipeRepo.count({
          region,
          categoryNiceName: category.niceName,
          'grants.search': 'draft/' + req['user']['niceName'],
        });
        category.draftCount = count;

        if (type && type == 'favorites') {
          await this.userRepo
            .findOneUser(
              { region, niceName: req['user']['niceName'] },
              { favorites: 1 },
            )
            .then(async (user) => {
              await this.recipeRepo
                .findRecipes(
                  {
                    region,
                    categoryNiceName: category['niceName'],
                    'images.0': { $exists: true },
                    niceName: { $in: user.favorites },
                  },
                  { niceName: 1 },
                )
                .then((recipes) => {
                  category['image'] = recipes.length
                    ? recipes[recipes.length - 1].niceName
                    : null;
                });
            });
        } else if (type && type == 'todo') {
          await this.userRepo
            .findOneUser(
              { region, niceName: req['user']['niceName'] },
              { todo: 1 },
            )
            .then(async (user) => {
              if (user.todo) {
                await this.recipeRepo
                  .findRecipes(
                    {
                      region,
                      categoryNiceName: category['niceName'],
                      'images.0': { $exists: true },
                      niceName: { $in: user.todo },
                    },
                    { niceName: 1 },
                  )
                  .then((recipes) => {
                    category['image'] = recipes.length
                      ? recipes[recipes.length - 1].niceName
                      : null;
                  });
              }
            });
        } else if (type && type == 'done') {
          await this.userRepo
            .findOneUser(
              { region, niceName: req['user']['niceName'] },
              { done: 1 },
            )
            .then(async (user) => {
              if (user.done) {
                await this.recipeRepo
                  .findRecipes(
                    {
                      region,
                      categoryNiceName: category['niceName'],
                      'images.0': { $exists: true },
                      niceName: { $in: user.done.map((us) => us.niceName) },
                    },
                    { niceName: 1 },
                  )
                  .then((recipes) => {
                    category['image'] = recipes.length
                      ? recipes[recipes.length - 1].niceName
                      : null;
                  });
              }
            });
        }
      });

      await Promise.all(userPromises);

      return _catArray;
    }

    throw new BadRequestException('recipes not found as per category');
  }
}
