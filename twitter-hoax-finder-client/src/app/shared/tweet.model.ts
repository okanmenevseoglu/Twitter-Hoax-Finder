export interface Tweet {
  id: number;
  text: string;
  createdAt: string;
  fromUser: string;
  profileImageUrl: string;
  inReplyToScreenName: string;
  languageCode: string;
  source: string;
  retweetCount: number;
  retweeted: boolean;
  retweetedStatus: Tweet;
  favorited: boolean;
  favoriteCount: number;
}
