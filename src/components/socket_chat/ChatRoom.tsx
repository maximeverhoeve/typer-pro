import { HStack, useBoolean, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useSocketContext from '../../hooks/useSocketContext';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import LeaveButton from './LeaveButton';

export interface ChatMessage {
  message: string;
  nickname: string;
}

interface Props {
  nickname: string;
  room: string;
}

const ChatRoom: React.FC<Props> = ({ nickname, room }) => {
  const { socket } = useSocketContext();
  const [isInputFocused, setIsInputFocused] = useBoolean();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleInputFocusChange = (isFocused: boolean): void => {
    if (isFocused) setIsInputFocused.on();
    else setIsInputFocused.off();
  };

  useEffect(() => {
    socket.on('chat:receive', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('chat:receive');
    };
  }, []);

  return (
    <VStack
      overflow="hidden"
      w="100%"
      h={isInputFocused ? '100%' : '50%'}
      align="stretch"
      transition="0.3s"
      transitionTimingFunction="ease-out"
      justify="flex-end"
    >
      <ChatMessages messages={messages} nickname={nickname} />
      <HStack>
        <ChatInput onFocusChange={handleInputFocusChange} />
        <LeaveButton />
      </HStack>
    </VStack>
  );
};

export default ChatRoom;
