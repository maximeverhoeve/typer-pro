import { useContext } from 'react';
import { GameContext, GameContextType } from './useGameInit';

const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  return context;
};

export default useGameContext;
