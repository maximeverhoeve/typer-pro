import { io, Socket } from 'socket.io-client';
import { createContext, useState } from 'react';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socketTypes';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3001',
  // 'https://typer-pro-backend.onrender.com/',
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

const useSocketInit = (): SocketContextType => {
  const [nickname, setNickname] = useState<string>();
  const [room, setRoom] = useState<string>();
  return { socket, room, setRoom, nickname, setNickname };
};

export default useSocketInit;
