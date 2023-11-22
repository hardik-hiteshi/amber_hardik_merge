type QueryValue =
  | string
  | { $regex: string; $options: string }
  | { $regex: string }
  | number
  | boolean;

export interface AdQueryInterface {
  $or?: Array<{
    [key: string]: QueryValue;
  }>;
}
