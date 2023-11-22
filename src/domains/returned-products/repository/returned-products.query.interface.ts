export interface ReturnedProductsQueryInterface {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
