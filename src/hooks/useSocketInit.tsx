import { io, Socket } from 'socket.io-client';
import { createContext, useState, useEffect } from 'react';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socketTypes';
import { useBoolean } from '@chakra-ui/react';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  // 'http://localhost:3001',
  'https://typer-pro-backend.onrender.com/',
  { transports: ['websocket', 'polling', 'flashsocket'] },
);

export interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  nickname?: string;
  room?: string;
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType>({
  // default values
  socket,
  isConnected: false,
});

const useSocketInit = (): SocketContextType => {
  const [nickname, setNickname] = useState<string>();
  const [room, setRoom] = useState<string>();
  const [isConnected, setIsConnected] = useBoolean();

  // INITIAL EVENTS
  useEffect(() => {
    // Joined room
    socket.on('room_joined', (socketProps) => {
      setRoom(socketProps.room);
      setNickname(socketProps.nickname);
    });
    // Left room
    socket.on('room_left', () => {
      setRoom(undefined);
    });

    return () => {
      socket.off('room_joined');
      socket.off('room_left');
    };
  }, []);

  // EVENTS ON ROOM CHANGE
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected.on();
      // reconnect to previous connected room
      if (nickname && room) socket.emit('join_room', { nickname, room });
    });

    socket.on('disconnect', () => {
      setIsConnected.off();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [room]);

  return { socket, room, nickname, isConnected };
};

export default useSocketInit;
