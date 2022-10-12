import { useContext } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../App';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socketTypes';

const useSocket = (): Socket<ServerToClientEvents, ClientToServerEvents> => {
  const socket = useContext(SocketContext);
  return socket;
};

export default useSocket;
