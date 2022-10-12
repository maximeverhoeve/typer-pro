import { HStack } from '@chakra-ui/react';
import React from 'react';
import Controls from './Controls';
import SocketChat from './SocketChat';

const Footer: React.FC = () => {
  return (
    <HStack justify="space-between" p="4">
      <Controls />
      <SocketChat />
    </HStack>
  );
};

export default Footer;
