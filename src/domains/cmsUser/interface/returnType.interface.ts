export interface IGetFollowindAndFlowers {
  following: {
    niceName: string;
    rank: string;
    displayName: string;
  }[];
  followingCount: number;
  followers: {
    niceName: string;
    rank: string;
    displayName: string;
  }[];
  followersCount: number;
}
