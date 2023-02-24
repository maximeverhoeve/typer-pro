import create from 'zustand';

interface SinglePlayerState {
  progress: number;
  setProgress: (value: number) => void;
  setPreviousTime: (time?: number) => void;
  previousTime?: number;
}

const useSinglePlayerStore = create<SinglePlayerState>((set) => {
  return {
    progress: 0,
    setProgress: (value) => set(() => ({ progress: value })),
    setPreviousTime: (time) => set(() => ({ previousTime: time })),
  };
});

export default useSinglePlayerStore;
