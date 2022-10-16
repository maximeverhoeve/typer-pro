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
      {messages.map(({ message, nickname: sender }, key) => {
        const isSenderMe = sender === nickname;
        return (
          <SlideFade in={!!message} key={`message_${key}`} unmountOnExit>
            <Text color="gray.500">
              <Text
                as="span"
                mr="2"
                color={isSenderMe ? 'gray.500' : 'gray.400'}
                fontWeight={isSenderMe ? 'unset' : 'bold'}
              >
                {sender}:
              </Text>
              <Text as="span">{message}</Text>
            </Text>
          </SlideFade>
        );
      })}
    </VStack>
  );
};

export default ChatMessages;
