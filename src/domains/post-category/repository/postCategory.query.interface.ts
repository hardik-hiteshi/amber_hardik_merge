export interface PostCategoryQueryInterface {
  region: string | undefined;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
