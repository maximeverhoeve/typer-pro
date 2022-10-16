import { HStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useSocketContext from '../hooks/useSocketContext';
import ChatRoom from './socket_chat/ChatRoom';
import JoinRoomButton from './socket_chat/JoinRoomButton';

const SocketChat: React.FC = () => {
  const { socket, room, setRoom, nickname, setNickname } = useSocketContext();

  useEffect(() => {
    socket.on('room_joined', (socketProps) => {
      setRoom(socketProps.room);
      setNickname(socketProps.nickname);
    });
    socket.on('disconnect', () => {
      console.log('disconnected', socket);
    });

    return () => {
      socket.off('room_joined');
    };
  }, []);

  return (
    <HStack w="100%" maxW={{ md: '80' }} align="flex-end">
      {room && nickname ? (
        <ChatRoom nickname={nickname} room={room} />
      ) : (
        <JoinRoomButton />
      )}
    </HStack>
  );
};

export default SocketChat;
