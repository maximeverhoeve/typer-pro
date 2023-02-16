import create from 'zustand';

type MenuItem = 'SINGLEPLAYER' | 'MULTIPLAYER' | 'LEADERBOARD';

interface CanvasState {
  hoveredItem: string;
  setHoveredItem: (hover: MenuItem) => void;
}

const useCanvasStore = create<CanvasState>((set) => {
  return {
    hoveredItem: 'SINGLEPLAYER',
    setHoveredItem: (itm) => set(() => ({ hoveredItem: itm })),
  };
});

export default useCanvasStore;
