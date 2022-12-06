import create from 'zustand';
import { v4 } from 'uuid';
import { persist, PersistOptions } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';

interface PlayerState {
  nickname: string;
  setNickname: (name: string) => void;
  id: string;
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
      id: v4(),
    }),
    { name: 'player-state', getStorage: () => sessionStorage },
  ),
);

export default usePlayerStore;
