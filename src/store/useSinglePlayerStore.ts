import create from 'zustand';

interface SinglePlayerState {
  progress: number;
  setProgress: (value: number) => void;
}

const useSinglePlayerStore = create<SinglePlayerState>((set) => {
  return {
    progress: 0,
    setProgress: (value) => set(() => ({ progress: value })),
  };
});

export default useSinglePlayerStore;
