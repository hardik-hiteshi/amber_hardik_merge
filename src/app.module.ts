import * as path from 'path';
import { AdvertisementModule } from './domains/advertisement/advertisement.module';
import { AffiliateConfigModule } from './domains/affiliateConfig/affiliateConfig.module';
import { AffiliateContactModule } from './domains/affiliateContact/affiliateContact.module';
import { AffiliateModule } from './domains/affiliate/affiliate.module';
import { AffiliateProductModule } from './domains/affiliateProducts/affiliateProducts.module';
import { AliasModule } from './domains/alias/alias.module';
import { AlternativeRecipeModule } from './domains/alternative-recipe/alternative-recipe.module';
import { APP_FILTER } from '@nestjs/core';
import { AuthorModule } from './domains/author/author.module';
import { BadgesModule } from './domains/badges/badges.module';
import { CategoryModule } from './domains/category/category.module';
import { CmsUserModule } from './domains/cmsUser/cmsUser.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './domains/contact/contact.module';
import { ConversionModule } from './domains/conversion/conversion.module';
import { CustomUnauthorizedExceptionFilter } from './common/interceptor';
import { DietsModule } from './domains/diets/diets.module';
import { DiscountModule } from './domains/discount/discount.module';
import { EbookModule } from './domains/ebook/ebook.module';
import { FactoryModule } from './domains/factory/factory.module';
import { FeaturedModule } from './domains/featured/featured.module';
import { FoodGroupModule } from './domains/food-group/food-group.module';
import { GeoLocationModule } from './domains/geoLocation/geoLocation.module';
import { IngredientModule } from './domains/ingredient/ingredient.module';
import { LegalHistoryModule } from './domains/legal-history/legal-history.module';
import { LegalRegistryModule } from './domains/legal-registry/legal-registry.module';
import { LegalTermsModule } from './domains/legal-terms/legal-terms.module';
import { MachineLogModule } from './domains/machine-log/machine-log.module';
import { MachineModelModule } from './domains/machineModel/machineModel.module';
import { MachineModule } from './domains/machine/machine.module';
import { Module } from '@nestjs/common';
import { mongoConnectionString } from './config/db';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsLetterMailModule } from './domains/news-letter-mail/news-letter-mail.module';
import { NewsModule } from './domains/news/news.module';
import { NotesModule } from './domains/notes/notes.module';
import { NutritionalDisclaimerModule } from './domains/nutritional-disclaimer/nutritional-disclaimer.module';
import { OrderModule } from './domains/order/order.module';
import { PictosModule } from './domains/pictos/pictos.module';
import { PostCategoryModule } from './domains/post-category/post-category.module';
import { PostPageModule } from './domains/post-page/post-page.module';
import { PostTagModule } from './domains/post-tag/postTag.module';
import { ProductModule } from './domains/product/product.module';
import { RankModule } from './domains/rank/rank.module';
import { RecipeModule } from './domains/recipe/recipe.module';
import { RegionModule } from './domains/region/region.module';
import { ReportAbuseModule } from './domains/report-abuse/report-abuse.module';
import { ReturnedProductsModule } from './domains/returned-products/returned-products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TipModule } from './domains/tip/tip.module';
import { UserLogModule } from './domains/user-log/user-log.module';
import { UserModule } from './domains/user/user.module';
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomUnauthorizedExceptionFilter,
    },
  ],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../uploads'),
      serveRoot: '/image', // Specify the route prefix for serving static files
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdvertisementModule,
    AlternativeRecipeModule,
    BadgesModule,
    CategoryModule,
    FactoryModule,
    FeaturedModule,
    MachineModule,
    MachineModelModule,
    RankModule,
    RecipeModule,
    UserLogModule,
    UserModule,
    CommonModule,
    TipModule,
    ProductModule,
    PictosModule,
    ReportAbuseModule,
    AliasModule,
    ContactModule,
    NewsLetterMailModule,
    LegalHistoryModule,
    NewsModule,
    DietsModule,
    LegalHistoryModule,
    LegalTermsModule,
    NotesModule,
    LegalRegistryModule,
    AuthorModule,
    EbookModule,
    NutritionalDisclaimerModule,
    FoodGroupModule,
    MachineLogModule,
    RegionModule,
    IngredientModule,
    PostTagModule,
    AffiliateModule,
    PostCategoryModule,
    AffiliateConfigModule,
    AffiliateContactModule,
    AffiliateProductModule,
    ConversionModule,
    PostPageModule,
    DiscountModule,
    ReturnedProductsModule,
    OrderModule,
    GeoLocationModule,
    CmsUserModule,
  ],
})
export class AppModule {}
