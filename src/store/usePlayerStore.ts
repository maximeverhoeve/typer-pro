import create from 'zustand';

interface PlayerState {
  nickname?: string;
  setNickname: (name: string) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  nickname: undefined,
  setNickname: (name) => set(() => ({ nickname: name })),
}));

export default usePlayerStore;
