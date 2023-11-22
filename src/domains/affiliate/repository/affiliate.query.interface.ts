export interface AffiliateQueryInterface {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
