import { io, Socket } from 'socket.io-client';
import { createContext, useState, useEffect } from 'react';
import {
  ClientToServerEvents,
  Player,
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
  players: Player[];
  isReady: boolean;
  onChangeProgress: (progress: number) => void;
}

export const SocketContext = createContext<SocketContextType>({
  // default values
  socket,
  isConnected: false,
  players: [],
  isReady: false,
  onChangeProgress: () => null,
});

const useSocketInit = (): SocketContextType => {
  const [nickname, setNickname] = useState<string>();
  const [room, setRoom] = useState<string>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [isConnected, setIsConnected] = useBoolean();
  const [isReady, setIsReady] = useBoolean();

  const onChangeProgress = (progress: number): void => {
    socket.emit('player:progress', progress);
  };

  const onRoomJoined = (socketProps: {
    room: string;
    nickname: string;
  }): void => {
    setRoom(socketProps.room);
    setNickname(socketProps.nickname);
  };

  const onRoomUpdated = (serverPlayers: Player[]): void => {
    setPlayers(serverPlayers);
    const thisPlayer = serverPlayers.find((p) => p.nickname === nickname);

    if (thisPlayer?.isReady) setIsReady.on();
    else setIsReady.off();
  };

  // INITIAL EVENTS
  useEffect(() => {
    // Joined room
    socket.on('room:joined', onRoomJoined);

    // Left room
    socket.on('room:left', () => {
      setRoom(undefined);
    });

    return () => {
      socket.off('room:joined');
      socket.off('room:left');
    };
  }, []);

  // EVENTS ON ROOM CHANGE
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected.on();
      // reconnect to previous connected room
      if (nickname && room) socket.emit('room:join', { nickname, room });
    });

    // Updated room
    socket.on('room:update', onRoomUpdated);

    socket.on('disconnect', () => {
      socket.emit('room:leave');
      setRoom(undefined);
      setIsConnected.off();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('room:update');
    };
  }, [room]);

  return {
    socket,
    room,
    nickname,
    isConnected,
    players,
    isReady,
    onChangeProgress,
  };
};

export default useSocketInit;
