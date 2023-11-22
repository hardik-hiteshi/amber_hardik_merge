type QueryValue =
  | string
  | { $regex: string; $options: string }
  | number
  | boolean;

export interface BadgeQueryInterface {
  $or?: Array<{
    [key: string]: QueryValue;
  }>;
}
