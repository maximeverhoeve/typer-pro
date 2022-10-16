import { useBoolean, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';
import { Message } from '../../types/socketTypes';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface Props {
  nickname: string;
  room: string;
}

const ChatRoom: React.FC<Props> = ({ nickname, room }) => {
  const socket = useSocket();
  const [isInputFocused, setIsInputFocused] = useBoolean();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputFocusChange = (isFocused: boolean): void => {
    if (isFocused) setIsInputFocused.on();
    else setIsInputFocused.off();
  };

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receive_message');
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
      <ChatInput onFocusChange={handleInputFocusChange} />
    </VStack>
  );
};

export default ChatRoom;