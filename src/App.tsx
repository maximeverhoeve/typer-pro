import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { createContext } from 'react';
import './App.css';
import Home from './pages/Home';
import { io, Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './types/socketTypes';
const ENDPOINT = 'http://localhost:3001';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] },
);

export const SocketContext = createContext(socket);

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
    <SocketContext.Provider value={socket}>
      <ChakraProvider theme={customTheme}>
        <Home />
      </ChakraProvider>
    </SocketContext.Provider>
  );
};

export default App;
