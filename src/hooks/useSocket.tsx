import { io, Socket } from 'socket.io-client';
import React, { useContext, PropsWithChildren } from 'react';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socketTypes';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_SERVER_URL || 'ws://localhost:3001',
  { transports: ['websocket'] },
);

export interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const SocketContext = React.createContext<SocketContextType>({ socket });

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => useContext(SocketContext);
