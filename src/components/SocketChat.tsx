import { HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import ChatRoom from './socket_chat/ChatRoom';
import JoinRoomButton from './socket_chat/JoinRoomButton';

const SocketChat: React.FC = () => {
  const socket = useSocket();
  const [room, setRoom] = useState<string>();
  const [nickname, setNickname] = useState<string>();

  useEffect(() => {
    socket.on('room_joined', ({ room, nickname }) => {
      setRoom(room);
      setNickname(nickname);
    });

    return () => {
      socket.off('room_joined');
    };
  }, []);

  return (
    <HStack>
      {room && nickname ? (
        <ChatRoom nickname={nickname} room={room} />
      ) : (
        <JoinRoomButton />
      )}
    </HStack>
  );
};

export default SocketChat;
