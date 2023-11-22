export interface FeaturedQueryInterface {
  region: string | undefined;
  type: string | undefined;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
