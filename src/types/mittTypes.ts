import { PlayerStats } from '../features/singleplayer/types/GameTypes';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MittEvents = {
  sp_finish_animation: {
    stats: PlayerStats;
    textId: string;
    isHighScore: boolean;
    highScore: number;
  };
  sp_navigate_to_leaderboard?: boolean;
};
