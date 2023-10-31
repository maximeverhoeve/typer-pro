import create from 'zustand';

interface SinglePlayerState {
  // progress of typing (0 to 1)
  progress: number;
  setProgress: (value: number) => void;
  // previous time (ghost)
  previousTime?: number;
  setPreviousTime: (time?: number) => void;
  // isFinishing
  isFinishing: boolean;
  setIsFinishing: {
    on: () => void;
    off: () => void;
  };
  // Loading environment
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

const useSinglePlayerStore = create<SinglePlayerState>((set) => {
  return {
    progress: 0,
    setProgress: (value) => set(() => ({ progress: value })),
    setPreviousTime: (time) => set(() => ({ previousTime: time })),
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
    isFinishing: false,
    setIsFinishing: {
      on: () => set(() => ({ isFinishing: true })),
      off: () => set(() => ({ isFinishing: false })),
    },
  };
});

export default useSinglePlayerStore;
