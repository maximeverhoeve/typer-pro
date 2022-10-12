import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState, ChangeEvent } from 'react';
import useSocket from '../../hooks/useSocket';
import { Message } from '../../types/socketTypes';

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
    <div>
      <VStack align="stretch">
        {messages.map(({ message, nickname }, key) => (
          <Text color="gray.300" key={`message_${key}`}>
            {nickname}: {message}
          </Text>
        ))}
      </VStack>
      <HStack>
        <Input
          color="gray.200"
          placeholder="Chat message"
          value={chatMessage}
          onChange={handleChangeInput}
        />
        <Button isDisabled={!chatMessage} onClick={handleSendButton}>
          Send
        </Button>
      </HStack>
    </div>
  );
};

export default ChatRoom;
