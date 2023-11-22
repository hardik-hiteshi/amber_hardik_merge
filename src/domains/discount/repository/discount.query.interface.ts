export interface DiscountQueryInterface {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
