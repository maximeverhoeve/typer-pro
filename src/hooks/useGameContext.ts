import { useContext } from 'react';
import { GameContext, GameContextType } from './useGame';

const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  return context;
};

export default useGameContext;
