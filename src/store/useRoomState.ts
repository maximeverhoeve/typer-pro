import create from 'zustand';
import { RoomStatus } from '../types/socketTypes';

interface RoomState {
  name?: string;
  status: RoomStatus;
  countdown: number;
  text?: string;
  leaderboard?: {
    [playerId: string]: {
      name: string;
      wpm: number;
      acc: number;
    };
  };
}

interface Actions {
  reset: () => void;
}

const defaultValues: RoomState = {
  status: 'IDLE',
  countdown: 0,
};

const useRoomState = create<RoomState & Actions>((set) => ({
  ...defaultValues,
  reset: () => {
    set(defaultValues);
  },
}));

export default useRoomState;
