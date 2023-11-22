import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './services/common.service';
import { FeaturedModule } from 'src/domains/featured/featured.module';
import { GeoLocationModule } from 'src/domains/geoLocation/geoLocation.module';
import { HelperService } from './services/helper.service';
import { RecipeModule } from 'src/domains/recipe/recipe.module';
import { TransactionService } from './services/transaction.service';
import { UserLogModule } from 'src/domains/user-log/user-log.module';
import { UserModule } from 'src/domains/user/user.module';

@Global()
@Module({
  providers: [HelperService, CommonService, TransactionService],
  exports: [HelperService, TransactionService, CommonService],
  controllers: [CommonController],
  imports: [
    GeoLocationModule,
    UserLogModule,
    UserModule,
    RecipeModule,
    FeaturedModule,
  ],
})
export class CommonModule {}
