export interface ConversionQueryInterface {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
