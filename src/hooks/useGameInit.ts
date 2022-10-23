import { createContext, useEffect, useState } from 'react';
import { useBoolean } from '@chakra-ui/react';
import useSocketContext from './useSocketContext';

export interface GameContextType {
  isStarted: boolean;
  textToType?: string;
}

export const GameContext = createContext<GameContextType>({
  // default values
  isStarted: false,
});

const useGameInit = (): GameContextType => {
  const { socket } = useSocketContext();
  const [isStarted, setIsStarted] = useBoolean();
  const [textToType, setTextToType] = useState<string>();

  const onGameStart = (text: string): void => {
    // console.log(text);
    setTextToType(text);
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
    textToType,
  };
};

export default useGameInit;
