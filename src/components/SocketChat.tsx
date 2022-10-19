import React from 'react';
import { Button, VStack } from '@chakra-ui/react';
import useSocketContext from '../hooks/useSocketContext';
import ChatRoom from './socket_chat/ChatRoom';
import JoinRoomButton from './socket_chat/JoinRoomButton';

const SocketChat: React.FC = () => {
  const { room, nickname } = useSocketContext();

  return (
    <VStack w="100%" maxW={{ md: '80' }} align="stretch" justify="flex-end">
      {room && nickname ? (
        <ChatRoom nickname={nickname} room={room} />
      ) : (
        <JoinRoomButton />
      )}
    </VStack>
  );
};

export default SocketChat;
