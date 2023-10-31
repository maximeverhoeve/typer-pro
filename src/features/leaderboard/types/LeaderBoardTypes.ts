export interface LeaderBoardObject {
  id: string;
  data: { text: string; last_updated?: string };
  topPlayer: LeaderboardData;
}

export interface LeaderboardData {
  id: string;
  name: string;
  acc: number;
  wpm: number;
}
