import React from 'react';
import { VStack } from '@chakra-ui/react';
import useSocketContext from '../hooks/useSocketContext';
import ChatRoom from './socket_chat/ChatRoom';
import JoinRoomButton from './socket_chat/JoinRoomButton';

const SocketChat: React.FC = () => {
  const { room, nickname } = useSocketContext();

  return (
    <VStack
      alignSelf="flex-end"
      w="100%"
      maxW={{ md: '80' }}
      align="stretch"
      ml="auto"
    >
      {room && nickname ? (
        <ChatRoom nickname={nickname} room={room} />
      ) : (
        <JoinRoomButton />
      )}
    </VStack>
  );
};

export default SocketChat;
