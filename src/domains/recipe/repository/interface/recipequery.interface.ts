type QueryValue =
  | string
  | { $regex: string; $options: string }
  | { $in: string[] }
  | boolean
  | number;

export interface QueryInterface {
  // region: string;
  $or?: Array<{
    [key: string]: QueryValue;
  }>;
}
