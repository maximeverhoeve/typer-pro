import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { createContext, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { io, Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './types/socketTypes';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  // 'http://localhost:3001',
  'https://typer-pro-backend.onrender.com/',
  { transports: ['websocket', 'polling', 'flashsocket'] },
);

export interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  nickname?: string;
  room?: string;
  setRoom: (room: string) => void;
  setNickname: (nickname: string) => void;
}

export const SocketContext = createContext<SocketContextType>({
  socket,
  setRoom: () => null,
  setNickname: () => null,
});

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
  const [nickname, setNickname] = useState<string>();
  const [room, setRoom] = useState<string>();

  return (
    <SocketContext.Provider
      value={{ socket, room, setRoom, nickname, setNickname }}
    >
      <ChakraProvider theme={customTheme}>
        <Home />
      </ChakraProvider>
    </SocketContext.Provider>
  );
};

export default App;
