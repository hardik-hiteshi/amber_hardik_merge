import {
  // CommunityConditions,
  Contact,
  History,
  Info,
  Location,
  // MemberConditions,
  Name,
  // OtherConditions,
  Profile,
  Recipe,
  ShopItem,
  Status,
  Translations,
} from './SubSchema/index';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Blocked } from './SubSchema/blocked.schema';
import { Done } from './SubSchema/dont.subschema';
import { FeaturedRepository } from 'src/domains/featured/repository/featured.repository';
import { HydratedDocument } from 'mongoose';
import { LegalSchema } from './SubSchema/legalSchema.schema';
import regions from 'src/common/elements/regions';
import roles from 'src/common/elements/roles';

export type UserDocument = HydratedDocument<User>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class User {
  @Prop(Name)
  public name: Name;

  @Prop(Location)
  public location: Location;

  @Prop(Contact)
  public contact: Contact;

  @Prop(History)
  public history: History;

  @Prop({ required: true })
  public login: string;

  @Prop({ required: [true, 'Please provide a niceName'] })
  public niceName: string;

  @Prop({ required: true })
  public password: string;

  @Prop(Profile)
  public profile: Profile;

  @Prop([String])
  public image: string[];

  @Prop()
  public rank: string;

  @Prop({ default: 'user', enum: roles })
  public role: string;

  @Prop(Info)
  public info: Info;

  @Prop(Status)
  public status: Status;

  @Prop([String])
  public dietPreferences: string[];

  @Prop([ShopItem])
  public shopItem: ShopItem[];

  @Prop([String])
  public grants: string[];

  @Prop([String])
  public favorites: string[];

  @Prop([String])
  public todo: string[];

  @Prop([String])
  public badges: string[];

  @Prop(LegalSchema)
  public memberConditions: LegalSchema;

  @Prop(LegalSchema)
  public communityConditions: LegalSchema;

  @Prop(LegalSchema)
  public internationalConditions: LegalSchema;

  @Prop(LegalSchema)
  public newsletterConditions: LegalSchema;

  @Prop(LegalSchema)
  public ebookConditions: LegalSchema;

  @Prop(LegalSchema)
  public contactConditions: LegalSchema;

  @Prop(LegalSchema)
  public termsOfSale: LegalSchema;

  @Prop({ enum: regions, required: true })
  public region: string;

  @Prop([String])
  public following: string[];

  @Prop([Recipe])
  public recipeList: Recipe[];

  @Prop(Translations)
  public translations: Translations;

  @Prop([String])
  public allowedRegions: string[];

  @Prop([Blocked])
  public blocked: Blocked[];

  @Prop([Blocked])
  public blockedBy: Blocked[];

  @Prop(Done)
  public done: Done[];

  @Prop({ default: [] })
  public follower: string[];

  public async getFeaturedUser(
    featuredRepo: FeaturedRepository,
  ): Promise<boolean> {
    let cacheFeatured = null;
    let lastTime = null;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;

    if (cacheFeatured === null || timeDiff > 3600) {
      lastTime = currentTime;
      const featuredItems = await featuredRepo.findAll();

      if (featuredItems.length > 0) {
        cacheFeatured = featuredItems.reduce((result, item) => {
          if (item.region) {
            if (!result[item.region]) {
              result[item.region] = [];
            }
            result[item.region].push(item.featuredUsers);
          }

          return result;
        });
      } else {
        // this.log.error("No featured in Mongo database");
        return false;
      }
    }

    return cacheFeatured && cacheFeatured[this.region]
      ? cacheFeatured[this.region].includes(this.niceName)
      : false;
  }
}
export const userSchema = SchemaFactory.createForClass(User);
