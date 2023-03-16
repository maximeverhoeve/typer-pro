import create from 'zustand';

interface SinglePlayerState {
  progress: number;
  setProgress: (value: number) => void;
  setPreviousTime: (time?: number) => void;
  previousTime?: number;
  isGameStarted: boolean;
  setIsGameStarted: {
    on: () => void;
    off: () => void;
  };
}

const useSinglePlayerStore = create<SinglePlayerState>((set) => {
  return {
    progress: 0,
    setProgress: (value) => set(() => ({ progress: value })),
    setPreviousTime: (time) => set(() => ({ previousTime: time })),
    isGameStarted: false,
    setIsGameStarted: {
      on: () => set(() => ({ isGameStarted: true })),
      off: () => set(() => ({ isGameStarted: false })),
    },
  };
});

export default useSinglePlayerStore;
