type QueryValue =
  | string
  | { $regex: string; $options: string }
  | { $in: string[] };

export interface QueryInterface {
  // region: string;
  $or?: Array<{
    [key: string]: QueryValue;
  }>;
}
