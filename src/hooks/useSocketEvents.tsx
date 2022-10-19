import { useEffect } from 'react';
import useSocketContext from './useSocketContext';

const useSocketEvents = (): void => {
  const { socket, room, setRoom, setNickname } = useSocketContext();

  // INITIAL EVENTS
  useEffect(() => {
    socket.on('room_joined', (socketProps) => {
      setRoom(socketProps.room);
      setNickname(socketProps.nickname);
    });

    return () => {
      socket.off('room_joined');
    };
  }, []);

  // EVENTS ON ROOM CHANGE
  useEffect(() => {
    socket.on('connect', () => {
      // reconnect to correct rooms
      console.log('user connected', room);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected', room);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [room]);
};

export default useSocketEvents;
