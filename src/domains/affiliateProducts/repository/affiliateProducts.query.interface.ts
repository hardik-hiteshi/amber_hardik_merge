export interface AffiliateProductQueryInterface {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
