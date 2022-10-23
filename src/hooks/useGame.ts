import { createContext, useEffect } from 'react';
import { useBoolean } from '@chakra-ui/react';
import useSocketContext from './useSocketContext';

export interface GameContextType {
  isStarted: boolean;
}

export const GameContext = createContext<GameContextType>({
  // default values
  isStarted: false,
});

const useGame = (): GameContextType => {
  const { socket } = useSocketContext();
  const [isStarted, setIsStarted] = useBoolean();

  const onGameStart = (text: string): void => {
    setIsStarted.on();
  };

  useEffect(() => {
    socket.on('game:started', onGameStart);

    return () => {
      socket.off('game:started');
    };
  }, []);

  return {
    isStarted,
  };
};

export default useGame;
