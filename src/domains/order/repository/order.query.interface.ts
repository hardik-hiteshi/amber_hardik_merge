export interface OrderQueryInterface {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
