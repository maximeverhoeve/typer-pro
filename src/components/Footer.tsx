import { HStack } from '@chakra-ui/react';
import React from 'react';
import useGameContext from '../hooks/useGameContext';
import useSocketContext from '../hooks/useSocketContext';
import Controls from './Controls';
import SocketChat from './SocketChat';

const Footer: React.FC = () => {
  const { room } = useSocketContext();
  const { isStarted } = useGameContext();
  return (
    <HStack align="stretch" justify="space-between" p="4">
      {!room && <Controls />}
      {!isStarted && <SocketChat />}
    </HStack>
  );
};

export default Footer;
