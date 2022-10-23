import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import useSocketInit, { SocketContext } from './hooks/useSocketInit';
import useGameInit, { GameContext } from './hooks/useGameInit';

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
      text: {
        default: 'gray.900',
        _dark: 'gray.50',
      },
    },
  },
  fonts: {
    heading: 'Roboto Mono',
    body: 'Roboto Mono',
  },
});

const App: React.FC = () => {
  const socketContextValues = useSocketInit();
  const gameContextValues = useGameInit();

  return (
    <SocketContext.Provider value={socketContextValues}>
      <GameContext.Provider value={gameContextValues}>
        <ChakraProvider theme={customTheme}>
          <Home />
        </ChakraProvider>
      </GameContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
