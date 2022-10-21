import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import useSocketInit, { SocketContext } from './hooks/useSocketInit';

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
  const contextValues = useSocketInit();

  return (
    <SocketContext.Provider value={contextValues}>
      <ChakraProvider theme={customTheme}>
        <Home />
      </ChakraProvider>
    </SocketContext.Provider>
  );
};

export default App;
