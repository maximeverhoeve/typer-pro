import create from 'zustand';
import { Player } from '../types/socketTypes';

interface MultiplayerState {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  // Loading multiplayer game environment
  isLoadingEnvironment: boolean;
  setIsLoadingEnvironment: {
    on: () => void;
    off: () => void;
  };
  // Game started state
  isGameStarted: boolean;
  setIsGameStarted: {
    on: () => void;
    off: () => void;
  };
}

const useMultiplayerStore = create<MultiplayerState>((set) => {
  return {
    players: [],
    setPlayers: (players) => set(() => ({ players })),
    isLoadingEnvironment: false,
    setIsLoadingEnvironment: {
      on: () => set(() => ({ isLoadingEnvironment: true })),
      off: () => set(() => ({ isLoadingEnvironment: false })),
    },
    isGameStarted: false,
    setIsGameStarted: {
      on: () => set(() => ({ isGameStarted: true })),
      off: () => set(() => ({ isGameStarted: false })),
    },
  };
});

export default useMultiplayerStore;
