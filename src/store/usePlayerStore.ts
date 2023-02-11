import create from 'zustand';
import { v4 } from 'uuid';
import { persist, PersistOptions } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';

interface PlayerState {
  id: string;
  nickname: string;
  setNickname: (name: string) => void;
}

type MyPersist = (
  config: StateCreator<PlayerState>,
  options: PersistOptions<PlayerState>,
) => StateCreator<PlayerState>;

const usePlayerStore = create<PlayerState>(
  (persist as MyPersist)(
    (set) => {
      const id = v4();
      return {
        nickname: 'devmax',
        setNickname: (name) => set(() => ({ nickname: name })),
        id,
      };
    },
    { name: 'player-state', getStorage: () => sessionStorage },
  ),
);

export default usePlayerStore;
