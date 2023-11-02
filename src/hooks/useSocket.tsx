import { io, Socket } from 'socket.io-client';
import React, { useContext, PropsWithChildren, useEffect } from 'react';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socketTypes';
import { useBoolean } from '@chakra-ui/react';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_SERVER_URL || 'ws://localhost:3001',
  { transports: ['websocket'] },
);

export interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  isConnected: boolean;
}

const SocketContext = React.createContext<SocketContextType>({
  socket,
  isConnected: false,
});

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isConnected, setIsConnected] = useBoolean();

  const handleConnect = (): void => {
    setIsConnected.on();
  };

  const handleDisConnect = (): void => {
    setIsConnected.off();
  };

  useEffect(() => {
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisConnect);

    return () => {
      socket.off('connect');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => useContext(SocketContext);
