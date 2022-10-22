import { io, Socket } from 'socket.io-client';
import { createContext, useState, useEffect } from 'react';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socketTypes';
import { useBoolean } from '@chakra-ui/react';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.REACT_APP_SERVER_URL || 'http://localhost:3001',
  { transports: ['websocket', 'polling', 'flashsocket'] },
);

export interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  nickname?: string;
  room?: string;
  isConnected: boolean;
  players: string[];
}

export const SocketContext = createContext<SocketContextType>({
  // default values
  socket,
  isConnected: false,
  players: [],
});

const useSocketInit = (): SocketContextType => {
  const [nickname, setNickname] = useState<string>();
  const [room, setRoom] = useState<string>();
  const [players, setPlayers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useBoolean();

  // INITIAL EVENTS
  useEffect(() => {
    // Joined room
    socket.on('room_joined', (socketProps) => {
      setRoom(socketProps.room);
      setNickname(socketProps.nickname);
    });

    // Updated room
    socket.on('room_updated', (serverPlayers: string[]) => {
      setPlayers(serverPlayers);
    });
    // Left room
    socket.on('room_left', () => {
      setRoom(undefined);
    });

    return () => {
      socket.off('room_joined');
      socket.off('room_left');
      socket.off('room_updated');
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

  return { socket, room, nickname, isConnected, players };
};

export default useSocketInit;
