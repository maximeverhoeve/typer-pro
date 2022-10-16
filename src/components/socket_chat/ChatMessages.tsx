import { SlideFade, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Message } from '../../types/socketTypes';

interface Props {
  messages: Message[];
  nickname: string;
}

const ChatMessages: React.FC<Props> = ({ messages, nickname }) => {
  return (
    <VStack align="stretch">
      {messages.map((message, i) => {
        const { nickname: sender } = message;
        const isSenderMe = sender === nickname;

        return (
          <SlideFade key={`message_${i}`} in={true} unmountOnExit>
            <ChatMessage message={message} isSenderMe={isSenderMe} />
          </SlideFade>
        );
      })}
    </VStack>
  );
};

interface ChatMessageProps {
  message: Message;
  isSenderMe: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSenderMe }) => {
  const { message: msg, nickname: sender } = message;
  return (
    <Text color="gray.500">
      <Text
        as="span"
        mr="2"
        color={isSenderMe ? 'gray.500' : 'gray.400'}
        fontWeight={isSenderMe ? 'unset' : 'bold'}
      >
        {sender}:
      </Text>
      <Text as="span">{msg}</Text>
    </Text>
  );
};

export default ChatMessages;
