import { Button, HStack, Input } from '@chakra-ui/react';
import React from 'react';

const SocketChat: React.FC = () => {
  return (
    <HStack>
      <Input color="gray.200" placeholder="Chat message" />
      <Button>Send</Button>
    </HStack>
  );
};

export default SocketChat;
