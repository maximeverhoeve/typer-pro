import create from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';

interface PlayerState {
  nickname: string;
  setNickname: (name: string) => void;
}

type MyPersist = (
  config: StateCreator<PlayerState>,
  options: PersistOptions<PlayerState>,
) => StateCreator<PlayerState>;

const usePlayerStore = create<PlayerState>(
  (persist as MyPersist)(
    (set) => ({
      nickname: 'devmax',
      setNickname: (name) => set(() => ({ nickname: name })),
    }),
    { name: 'player-state', getStorage: () => sessionStorage },
  ),
);

export default usePlayerStore;
