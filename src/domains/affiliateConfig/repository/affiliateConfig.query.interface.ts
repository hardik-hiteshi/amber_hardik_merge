export interface AffiliateConfigQueryInterface {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
