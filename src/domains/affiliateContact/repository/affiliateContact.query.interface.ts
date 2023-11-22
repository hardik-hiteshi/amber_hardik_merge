export interface AffiliateContactQueryInterface {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
