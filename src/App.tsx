import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import Home from './pages/Home';

const App: React.FC = () => {
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
  return (
    <ChakraProvider theme={customTheme}>
      <Home />
    </ChakraProvider>
  );
};

export default App;
