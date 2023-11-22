import { Schema as mongooseSchema } from 'mongoose';

export class CreateAffiliateProductDTO {
  // @IsMongoId()
  public affiliateProduct: mongooseSchema.Types.Mixed;
}
