type QueryValue = string | { $regex: string; $options: string };

export interface CategoryQueryInterface {
  // region: string;
  $or?: Array<{
    [key: string]: QueryValue;
  }>;
}
