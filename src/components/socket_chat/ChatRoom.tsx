import {
  HStack,
  IconButton,
  Input,
  SlideFade,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState, ChangeEvent } from 'react';
import useSocket from '../../hooks/useSocket';
import { Message } from '../../types/socketTypes';
import { IoMdSend } from 'react-icons/io';

interface Props {
  nickname: string;
  room: string;
}

const ChatRoom: React.FC<Props> = ({ nickname, room }) => {
  const socket = useSocket();
  const [chatMessage, setChatMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendButton = (): void => {
    if (chatMessage) {
      socket.emit('send_message', { message: chatMessage });
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setChatMessage(e.currentTarget.value);
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
    <VStack overflow="hidden" h="100%" align="stretch" justify="flex-end">
      <VStack align="stretch">
        {messages.map(({ message, nickname: sender }, key) => (
          <SlideFade in={!!message} key={`message_${key}`} unmountOnExit>
            <Text color={sender === nickname ? 'gray.300' : 'blue.100'}>
              {sender}: {message}
            </Text>
          </SlideFade>
        ))}
      </VStack>
      <HStack>
        <Input
          color="gray.200"
          placeholder="Chat message"
          value={chatMessage}
          onChange={handleChangeInput}
        />
        <IconButton
          aria-label="Send"
          icon={<IoMdSend />}
          isDisabled={!chatMessage}
          onClick={handleSendButton}
        />
      </HStack>
    </VStack>
  );
};

export default ChatRoom;
